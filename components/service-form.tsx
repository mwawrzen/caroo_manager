import RemoveButton from "@/components/ui/button/remove-button";
import Form from "@/components/ui/form/form";
import useCarStore from "@/store/car-store";
import usePreferencesStore from "@/store/preferences-store";
import { statusTypes } from "@/utils/data";
import { AddServiceType, FormInputTypeEnum, Service, ServiceStatusEnum } from "@/utils/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ServiceForm({ service = null }: { service?: Service | null }) {

  const { t } = useTranslation();

  const { currentCar, addService, editService, removeService } = useCarStore();

  if (!currentCar)
    return null;

  const router = useRouter();

  const { distanceUnit, priceUnit } = usePreferencesStore();

  const [date, setDate] = useState<Date>(service?.date || new Date(Date.now()));
  const [price, setPrice] = useState<string>(String(service?.price || ''));
  const [mileage, setMileage] = useState<string>(String(service?.mileage || currentCar.mileage));
  const [description, setDescription] = useState<string>(service?.description || '');
  const [note, setNote] = useState<string>(service?.note || '');
  const [status, setStatus] =
    useState<ServiceStatusEnum>(service?.status || ServiceStatusEnum.PLANNED);

  const statusTypeOptions = statusTypes.map(({ icon, value }, i) => {
    return (
      <Form.Radio
        key={i}
        icon={icon}
        label={t(value)}
        value={value}
        isActive={status === value}
        onPress={setStatus}
      />
    );
  });

  function handleRemove() {
    if (!currentCar || !service)
      return null;
    removeService(currentCar.id, service.id);
    router.navigate('/services-list');
  }

  function handleSubmit() {
    if (!currentCar)
      return null;

    const payload: AddServiceType = {
      status: status,
      description: description,
      note: note
    };

    if (status === ServiceStatusEnum.SCHEDULDED) {
      payload.date = date;
    }

    if (status === ServiceStatusEnum.COMPLETED) {
      payload.date = date;
      payload.price = Number(price);
      payload.mileage = Number(mileage);
    }

    if (service)
      editService(currentCar.id, service.id, payload);
    else
      addService(currentCar.id, payload);

    router.navigate('/services-list');
  }

  function checkIsValidated(): boolean {
    if (
      !currentCar ||
      description.length <= 0 ||
      (
        status === ServiceStatusEnum.COMPLETED &&
        (Number(price) <= 0 || Number(mileage) <= 0)
      )
    )
      return false;
    return true;
  }

  return (
    <Form title={t(service ? 'editServiceButton' : 'addServiceLabel')}>
      <Form.RadioGroup>
        {statusTypeOptions}
      </Form.RadioGroup>
      {
        status !== ServiceStatusEnum.PLANNED ?
          <Form.DateInput currentDate={date} setCurrentDate={setDate} /> : null
      }
      {
        status === ServiceStatusEnum.COMPLETED ? (
          <>
            <Form.Input
              value={price}
              onChangeText={setPrice}
              placeholder={t('enterPrice')}
              unit={priceUnit}
              type={FormInputTypeEnum.FLOAT}
            />
            <Form.Input
              value={mileage}
              onChangeText={setMileage}
              placeholder={t('enterMileage')}
              unit={distanceUnit}
              type={FormInputTypeEnum.INT}
            />
          </>
        ): null
      }
      <Form.Input
        value={description}
        onChangeText={setDescription}
        placeholder={t('enterDescription')}
      />
      <Form.Input
        value={note}
        onChangeText={setNote}
        placeholder={t('enterNote')}
      />
      { service ? <RemoveButton onPress={handleRemove} /> : null }
      { checkIsValidated() ? <Form.Submit onPress={handleSubmit} /> : null }
    </Form>
  );
}
