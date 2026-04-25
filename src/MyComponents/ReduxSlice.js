import { createSlice } from '@reduxjs/toolkit';

//generowanie ID
const generateId = () => crypto.randomUUID();

// Ciąg Fibonacciego dla populacji królików
const getFibonacci = (n) => {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    return getFibonacci(n - 1) + getFibonacci(n - 2);
};

const initialState = {
    turn: 0,
    grass: 1000,
    rabbits: Array.from({ length: 190}).map(() => ({ id: generateId(), age: 0, energy: 20 })),
    wolves: Array.from({ length: 7}).map(() => ({ id: generateId(), age: 0, energy: 17 })),
    rabbitFibIndex: 1,
    currentEvent: null,
    history: []
};

const events = [
    { name: 'Brak zdarzeń', effect: (state) => state },
    { name: 'Susza', effect: (state) => ({ ...state, grass: Math.floor(state.grass * 0.5) }) },
    { name: 'Pożar', effect: (state) => ({
        grass: Math.floor(state.grass * 0.3),
        rabbits: state.rabbits.filter(() => Math.random() > 0.5),
        wolves: state.wolves.filter(() => Math.random() > 0.3)
    })},
    { name: 'Obfitość', effect: (state) => ({ ...state, grass: state.grass +100 }) },
    { name: 'Choroba królików', effect: (state) => ({
        ...state,
        rabbits: state.rabbits.filter(() => Math.random() > 0.6)
    })}
];

const ecosystemSlice = createSlice({
    name: 'ecosystem',
    initialState,
    reducers: {
        nextTurn: (state) => {
            state.turn += 1;

            const randomEvent = events[Math.floor(Math.random() * events.length)];
            state.currentEvent = randomEvent.name;

            let tempState = randomEvent.effect(state);
            state.grass = tempState.grass;
            state.rabbits = tempState.rabbits;
            state.wolves = tempState.wolves;

            state.grass += 200;

            const rabbitEatingResult = state.rabbits.reduce((acc, rabbit) => {
                if (acc.remainingGrass >= 2) {
                    acc.remainingGrass -= 2;
                    acc.fedRabbits.push({ ...rabbit, energy: rabbit.energy + 30 });
                } else {
                    acc.fedRabbits.push({ ...rabbit, energy: rabbit.energy - 2 });
                } return acc;
            }, { remainingGrass: state.grass, fedRabbits: [] });

            state.grass = rabbitEatingResult.remainingGrass;

            const wolfHuntingResult = state.wolves.reduce((acc, wolf) => {
                if (acc.survivingRabbits.length > 0) {
                    acc.survivingRabbits.pop();
                    acc.fedWolves.push({ ...wolf, energy: wolf.energy + 3 });
                }else { 
                    acc.fedWolves.push({ ...wolf, energy: wolf.energy - 2 });
                } return acc;
            }, { survivingRabbits: [...rabbitEatingResult.fedRabbits], fedWolves: [] });

            let currentRabbits = wolfHuntingResult.survivingRabbits
                .map(r => ({ ...r, age: r.age + 1, energy: r.energy -1 }))
                .filter(r => r.energy > 0 && r.age < 15);

            let currentWolves = wolfHuntingResult.fedWolves
                .map(w => ({ ...w, age: w.age + 1, energy: w.energy - 2}))
                .filter(w => w.energy > 0 && w.age < 20);

            if (state.grass > currentRabbits.length * 5 && currentRabbits.length > 1) {
                state.rabbitFibIndex += 1;
                const newRabbitsCount = getFibonacci(state.rabbitFibIndex);
                const newRabbits = Array.from({ length: Math.min(newRabbitsCount, 50) }).map(() => ({
                    id: generateId(), age: 0, energy: 10
                }));
                currentRabbits = [...currentRabbits, ...newRabbits];
            } else {
                state.rabbitFibIndex = Math.max(1, state.rabbitFibIndex - 1);
            }

            const newWolves = currentWolves
                .filter(w => w.energy > 20)
                .map(() => ({ id: generateId(), age: 0, energy: 15 }));

            currentWolves = currentWolves.map(w => w.energy > 20 ? { ...w, energy: w.energy - 10 } : w);
            currentWolves = [...currentWolves, ...newWolves];

            state.rabbits = currentRabbits;
            state.wolves = currentWolves;

            state.history.push({
                turn: state.turn,
                grass: state.grass,
                rabbits: state.rabbits.length,
                wolves: state.wolves.length,
                event: state.currentEvent
            });
        },

        resetSimulation: () => initialState
    }
});

export const { nextTurn, resetSimulation } = ecosystemSlice.actions;
export default ecosystemSlice.reducer;