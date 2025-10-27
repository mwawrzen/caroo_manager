import Form from "@/components/form";
import Form from "@/components/ui/form/form";
import useCarStore from "@/store/car-store";
import usePreferencesStore from "@/store/preferences-store";
import { statusTypes } from "@/utils/data";
import { ServiceStatusEnum } from "@/utils/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function AddService() {

  const { t } = useTranslation();

  const { currentCar, addService } = useCarStore();

  if (!currentCar)
    return null;

  const router = useRouter();

  const [date, setDate] = useState<Date>(new Date(Date.now()));
  const [description, setDescription] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [status, setStatus] =
    useState<ServiceStatusEnum.PLANNED | ServiceStatusEnum.SCHEDULDED>(ServiceStatusEnum.PLANNED);

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

  function handleAddService() { //TODO form validation
    if (!currentCar)
      return null;
    addService(currentCar.id, {
      status: status,
      description: description,
      note: note
    });
    if (router.canGoBack())
      router.back();
  }

  function checkIsValidated(): boolean {
    if (!currentCar || description.length <= 0)
      return false;
    return true;
  }

  return (
    <Form title={t('addServiceLabel')}>
      <Form.RadioGroup>
        {statusTypeOptions}
      </Form.RadioGroup>
      {
        status === ServiceStatusEnum.SCHEDULDED ?
          <Form.DateInput dateObj={date} /> : null
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
      { checkIsValidated() ? <Form.Submit onPress={handleAddService} /> : null }
    </Form>
  );
}
