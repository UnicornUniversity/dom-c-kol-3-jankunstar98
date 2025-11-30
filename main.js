/**
 * Data pro generování (Sekvence 1 - Inicializace)
 * [span_0](start_span)Tyto pole definují možnosti, ze kterých se náhodně vybírá[span_0](end_span).
 */
const DATA = {
  genders: ["male", "female"], // 1.2. Step Pole pohlaví
  workloads: [10, 20, 30, 40], // 1.3. Step Pole pracovního úvazku
  names: { // 1.4. Step Pole jmen (rozděleno podle pohlaví pro realističnost)
    male: ["Jan", "Petr", "Martin", "Tomáš", "Lukáš", "Jakub"],
    female: ["Jana", "Eva", "Hana", "Anna", "Lenka", "Lucie"]
  },
  surnames: ["Novák", "Svoboda", "Dvořák", "Černý", "Procházka", "Kučera"] // 1.5. Step Pole příjmení
};

/**
 * Pomocná funkce pro náhodný výběr z pole
 */
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Hlavní funkce aplikace
 * [span_1](start_span)@param {object} dtoIn - Vstupní data { count, age: { min, max } }[span_1](end_span)
 * [span_2](start_span)@returns {Array} dtoOut - Seznam zaměstnanců[span_2](end_span)
 */
export function main(dtoIn) {
  // 2.1. [span_3](start_span)Step minimální věk[span_3](end_span)
  const minAge = dtoIn.age.min;

  // 2.2. [span_4](start_span)Step maximální věk[span_4](end_span)
  const maxAge = dtoIn.age.max;

  // 2.3. Sequence funkce tvořící náhodné datum narozenin
  [span_5](start_span)// Funkce vrací datum v ISO formátu tak, aby věk odpovídal min/max[span_5](end_span)
  function generateRandomBirthdate() {
    // 2.3.1. Step konstanta současného času
    const now = new Date();

    // 2.3.2. Step nejnižší datum (nejvzdálenější v minulosti = člověk s maxAge)
    // Aby bylo člověku maxAge, musel se narodit před 'maxAge' lety.
    const minDateLimit = new Date();
    minDateLimit.setFullYear(now.getFullYear() - maxAge);

    // 2.3.3. Step nejvyšší datum (nejbližší v minulosti = člověk s minAge)
    // Aby bylo člověku minAge, musel se narodit před 'minAge' lety.
    const maxDateLimit = new Date();
    maxDateLimit.setFullYear(now.getFullYear() - minAge);

    // 2.3.4. Step náhodné datum (mezi limity)
    const randomTime = minDateLimit.getTime() + Math.random() * (maxDateLimit.getTime() - minDateLimit.getTime());
    const randomDate = new Date(randomTime);

    // 2.3.5. Step výstup funkce (ISO formát)
    return randomDate.toISOString();
  }

  // 2.4. [span_6](start_span)Sequence inicializace proměnných[span_6](end_span)
  
  // 2.4.1. Step vytvoření dtoOut
  let dtoOut = [];

  // 2.4.2. [span_7](start_span)Step vytvoření counteru (shodná hodnota jako count v dtoIn)[span_7](end_span)
  let counter = dtoIn.count;

  // 2.5. [span_8](start_span)Iteration cyklus (dokud counter > 0)[span_8](end_span)
  while (counter > 0) {
    
    // 2.5.2.1. [span_9](start_span)Step tvorba pohlaví (potřebujeme ho dříve pro výběr jména)[span_9](end_span)
    const gender = getRandomItem(DATA.genders);

    // 2.5.1. [span_10](start_span)Sequence výběr náhodného jména a příjmení[span_10](end_span)
    // 2.5.1.1. Step výběr náhodného jména (z pole jmen podle pohlaví)
    const name = getRandomItem(DATA.names[gender]);

    // 2.5.1.2. [span_11](start_span)Step výběr náhodného příjmení[span_11](end_span)
    const surname = getRandomItem(DATA.surnames);

    // 2.5.2.2. Step tvorba narozenin
    const birthdate = generateRandomBirthdate();

    // 2.5.2.5. Step tvorba workload
    const workload = getRandomItem(DATA.workloads);

    // 2.5.2. Sequence úprava dtoOut - Sestavení objektu zaměstnance
    const employee = {
      gender: gender,
      birthdate: birthdate,
      name: name,      // 2.5.2.3. Step tvorba jména
      surname: surname, // 2.5.2.4. [span_12](start_span)Step tvorba příjmení[span_12](end_span)
      workload: workload
    };

    // Přidání do pole
    dtoOut.push(employee);

    // Dekrementace counteru
    counter--;
  }

  // 2.6. [span_13](start_span)Step výstup funkce[span_13](end_span)
  return dtoOut;
}


// Příklad volání (pouze pro testování):
const testInput = {
    count: 5,
    age: { min: 19, max: 35 }
};
console.log(main(testInput));

