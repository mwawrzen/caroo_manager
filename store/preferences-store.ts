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
  setLanguage: language => set(state => ({ language })),
  setPriceUnit: priceUnit => set(state => ({ priceUnit })),
  setDistanceUnit: distanceUnit => set(state => ({ distanceUnit })),
  setCapacityUnit: capacityUnit => set(state => ({ capacityUnit }))
}));

export default usePreferencesStore;
