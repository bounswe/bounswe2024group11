const carTerms = [
    { en: "trunk", tr: "bagaj" },
    { en: "hood", tr: "kaput" },
    { en: "steering wheel", tr: "direksiyon" },
    { en: "engine", tr: "motor" },
    { en: "brakes", tr: "frenler" },
    { en: "tire", tr: "lastik" },
    { en: "mirror", tr: "ayna" },
    { en: "headlight", tr: "far" },
    { en: "gearbox", tr: "vites kutusu" },
    { en: "windshield", tr: "ön cam" },
    { en: "dashboard", tr: "gösterge paneli" },
    { en: "seat belt", tr: "emniyet kemeri" },
    { en: "accelerator", tr: "gaz pedalı" },
    { en: "brake pedal", tr: "fren pedalı" },
    { en: "clutch", tr: "debriyaj" },
    { en: "fuel tank", tr: "yakıt tankı" },
    { en: "radiator", tr: "radyatör" },
    { en: "exhaust", tr: "egzoz" },
    { en: "ignition", tr: "ateşleme" },
    { en: "gear lever", tr: "vites kolu" },
];

const generateQuiz = () => {
    const shuffleArray = (array: any[]) =>
        array.sort(() => Math.random() - 0.5);

    const questions = carTerms.map((term) => {
        // Shuffle car terms to select wrong options
        const shuffledTerms = shuffleArray([...carTerms]);

        // Ensure the current term (correct answer) is not part of wrong options
        const wrongOptions = shuffledTerms
            .filter((t) => t.en !== term.en)
            .slice(0, 3); // Select 3 wrong options

        // Create the 4 options, including the correct one
        const options = shuffleArray([
            ...wrongOptions.map((t) => ({
                id: `${t.en}-${Math.random()}`, // Create a unique ID
                text: t.tr,
                is_correct: "false",
            })),
            {
                id: `${term.en}-${Math.random()}`,
                text: term.tr,
                is_correct: "true",
            },
        ]);

        // Construct the question object
        return {
            id: `${term.en}-${Math.random()}`, // Unique ID for the question
            text: `What is the translation of "${term.en}" in Turkish?`,
            options,
            selected_option_id: "",
        };
    });

    // Shuffle and return 10 random questions
    return shuffleArray(questions).slice(0, 10);
};

export const quizData = generateQuiz();
