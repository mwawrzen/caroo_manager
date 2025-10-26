import i18n from "@/utils/i18n/i18n";
import { mapLanguage } from "@/utils/map-lang";
import { CapacityUnitEnum, DistanceUnitEnum, LangEnum, PriceUnitEnum } from "@/utils/types";
import { create } from "zustand";

interface PreferencesStore {
  language: LangEnum;
  priceUnit: PriceUnitEnum;
  distanceUnit: DistanceUnitEnum;
  capacityUnit: CapacityUnitEnum;
  setLanguage: (lang: LangEnum) => void;
  setPriceUnit: (unit: PriceUnitEnum) => void;
  setDistanceUnit: (unit: DistanceUnitEnum) => void;
  setCapacityUnit: (unit: CapacityUnitEnum) => void;
}

const usePreferencesStore = create<PreferencesStore>()(set => ({
  language: LangEnum.ENGLISH,
  priceUnit: PriceUnitEnum.EUR,
  distanceUnit: DistanceUnitEnum.KM,
  capacityUnit: CapacityUnitEnum.L,
  setLanguage: language => set(() => {
    i18n.changeLanguage(mapLanguage(language));
    return { language };
  }),
  setPriceUnit: priceUnit => set(() => ({ priceUnit })),
  setDistanceUnit: distanceUnit => set(() => ({ distanceUnit })),
  setCapacityUnit: capacityUnit => set(() => ({ capacityUnit }))
}));

export default usePreferencesStore;
