import Form from "@/components/form";
import useCarStore from "@/store/car-store";
import { ServiceStatusEnum } from "@/utils/types";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import { useState } from "react";

type StatusType = {
  icon: keyof typeof FontAwesome6.glyphMap,
  label: string,
  value: ServiceStatusEnum;
};

const statusTypes: StatusType[] = [
  { icon: 'question', label: 'Planned', value: ServiceStatusEnum.PLANNED },
  { icon: 'calendar-days', label: 'Schedulded', value: ServiceStatusEnum.SCHEDULDED }
];

export default function AddService() {

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
    <Form title="Add service">
      <Form.RadioGroup>
        {statusTypeOptions}
      </Form.RadioGroup>
      <Form.Input
        value={serviceDescription}
        onChangeText={setServiceDescription}
        placeholder="Enter description"
      />
      <Form.Input
        value={serviceNote}
        onChangeText={setServiceNote}
        placeholder="Enter note"
      />
      <Form.Submit onPress={handleAddService} />
    </Form>
  );
}
