import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      //add car
      addCarFormTitle: 'Add a car',
      enterName: 'Enter name',
      enterMileage: 'Enter mileage',
      primaryFuelTitle: 'Primary fuel',
      alternativeFuelTitle: 'Alternative fuel',

      //units
      petrol: 'Petrol',
      diesel: 'Diesel',
      electric: 'Electric',
      gas: 'Gas',
      km: 'KILOMETERS',
      mi: 'MILES',
      L: 'LITRES',
      GAL: 'GALLONS',

      //dashboard
      addServiceLabel: 'Add service',
      addRefuelLabel: 'Add refuel',
      generalInfoTitle: 'General info',
      summaryRefulesTitle: 'Summary for refuels',
      summaryServicesTitle: 'Summary for services',

      //refuels list
      refuelsTitle: 'Refuels',
      addButton: 'Add',
      fuelItem: 'Fuel',
      fullyRefueledItem: 'Fully refueled',
      amountOfFuelItem: 'Amount of fuel',
      unitPriceItem: 'Unit price',
      sumPriceItem: 'Sum price',
      avgConsItem: 'Average consumption',
      mileageItem: 'Mileage',
      noteItem: 'Note'
    }
  },
  pl: {
    translation: {
      //add car
      addCarFormTitle: 'Dodaj samochód',
      enterName: 'Wprowadź nazwę',
      enterMileage: 'Wprowadź przebieg',
      primaryFuelTitle: 'Paliwo główne',
      alternativeFuelTitle: 'Paliwo alternatywne',

      //units
      petrol: 'Benzyna',
      diesel: 'Diesel',
      electric: 'Elektryk',
      gas: 'Gaz',
      km: 'KILOMETRY',
      mi: 'MILE',
      L: 'LITRY',
      GAL: 'GALONY',

      //dashboard
      addServiceLabel: 'Dodaj serwis',
      addRefuelLabel: 'Dodaj tankowanie',
      generalInfoTitle: 'Ogólne informacje',
      summaryRefulesTitle: 'Podsumowanie tankowań',
      summaryServicesTitle: 'Podsumowanie serwisów'
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'pl', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
