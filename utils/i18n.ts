import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      //basic
      yes: 'Yes',
      no: 'No',
      addButton: 'Add',
      readyButton: 'Ready',

      //form inputs
      enterName: 'Enter name',
      enterMileage: 'Enter mileage',
      enterUnitPrice: 'Enter unit price',
      enterAmountOfFuel: 'Enter amount of fuel',
      enterDescription: 'Enter description',
      enterNote: 'Enter note',

      //add car
      addCarFormTitle: 'Add car',
      primaryFuelTitle: 'Primary fuel',
      alternativeFuelTitle: 'Alternative fuel',

      //enums
      petrol: 'Petrol',
      diesel: 'Diesel',
      electric: 'Electric',
      gas: 'Gas',
      km: 'KILOMETERS',
      mi: 'MILES',
      L: 'LITRES',
      GAL: 'GALLONS',
      planned: 'Planned',
      schedulded: 'Schedulded',
      completed: 'Completed',

      //dashboard
      addServiceLabel: 'Add service',
      addRefuelLabel: 'Add refuel',
      generalInfoTitle: 'General info',
      summaryRefulesTitle: 'Summary for refuels',
      summaryServicesTitle: 'Summary for services',

      //refuels list
      refuelsTitle: 'Refuels',
      fuelItem: 'Fuel',
      fullyRefueledItem: 'Fully refueled',
      amountOfFuelItem: 'Amount of fuel',
      unitPriceItem: 'Unit price',
      sumPriceItem: 'Sum price',
      avgConsItem: 'Average consumption',
      mileageItem: 'Mileage',
      noteItem: 'Note',

      //add refuel form -> no need

      //services list
      servicesTitle: 'Services',
      statusItem: 'Status',
      priceItem: 'Price',
      description: 'Description'
    }
  },
  pl: {
    translation: {
      //basic
      yes: 'Tak',
      no: 'Nie',
      addButton: 'Dodaj',
      readyButton: 'Dodaj',

      //form inputs
      enterName: 'Wprowadź nazwę',
      enterMileage: 'Wprowadź przebieg',
      enterUnitPrice: 'Wprowadź cenę jednostkową',
      enterAmountOfFuel: 'Wprowadź ilość paliwa',
      enterDescription: 'Wprowadź opis',
      enterNote: 'Wprowadź notatkę',

      //add car
      addCarFormTitle: 'Dodaj samochód',
      primaryFuelTitle: 'Paliwo główne',
      alternativeFuelTitle: 'Paliwo alternatywne',

      //enums
      petrol: 'Benzyna',
      diesel: 'Diesel',
      electric: 'Elektryk',
      gas: 'Gaz',
      km: 'KILOMETRY',
      mi: 'MILE',
      L: 'LITRY',
      GAL: 'GALONY',
      planned: 'Zaplanowany',
      schedulded: 'Umówiony',
      completed: 'Zakończony',

      //dashboard
      addServiceLabel: 'Dodaj serwis',
      addRefuelLabel: 'Dodaj tankowanie',
      generalInfoTitle: 'Ogólne informacje',
      summaryRefulesTitle: 'Podsumowanie tankowań',
      summaryServicesTitle: 'Podsumowanie serwisów',

      //refuels list
      refuelsTitle: 'Lista tankowań',
      fuelItem: 'Paliwo',
      fullyRefueledItem: 'Tankowanie do pełna',
      amountOfFuelItem: 'Ilość paliwa',
      unitPriceItem: 'Cena jednostkowa',
      sumPriceItem: 'Cena sumaryczna',
      avgConsItem: 'Średnie spalanie',
      mileageItem: 'Przebieg',
      noteItem: 'Notatka',

      //add refuel form -> no need

      //services list
      servicesTitle: 'Serwisy',
      statusItem: 'Status',
      priceItem: 'Cena',
      description: 'Opis'
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
