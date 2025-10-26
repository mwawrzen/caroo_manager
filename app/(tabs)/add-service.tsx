import Form from "@/components/form";
import useCarStore from "@/store/car-store";
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

  const [serviceDescription, setServiceDescription] = useState<string>('');
  const [serviceNote, setServiceNote] = useState<string>('');
  const [serviceStatus, setServiceStatus] =
    useState<ServiceStatusEnum.PLANNED | ServiceStatusEnum.SCHEDULDED>(ServiceStatusEnum.PLANNED);

  const statusTypeOptions = statusTypes.map(({ icon, label, value }) => {
    return (
      <Form.Radio
        key={label}
        icon={icon}
        label={label}
        value={value}
        isActive={serviceStatus === value}
        onPress={setServiceStatus}
      />
    );
  });

  function handleAddService() { //TODO form validation
    if (!currentCar)
      return null;
    addService(currentCar.id, {
      status: serviceStatus,
      description: serviceDescription,
      note: serviceNote
    });
    if (router.canGoBack())
      router.back();
  }

  return (
    <Form title={t('addServiceLabel')}>
      <Form.RadioGroup>
        {statusTypeOptions}
      </Form.RadioGroup>
      <Form.Input
        value={serviceDescription}
        onChangeText={setServiceDescription}
        placeholder={t('enterDescription')}
      />
      <Form.Input
        value={serviceNote}
        onChangeText={setServiceNote}
        placeholder={t('enterNote')}
      />
      <Form.Submit onPress={handleAddService} />
    </Form>
  );
}
