// Simulated async operations
const makeBreakfast = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('🍳 Made breakfast');
            resolve('Breakfast ready');
        }, 2000);
    });
};

const makeLunch = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('🥗 Made lunch');
            resolve('Lunch ready');
        }, 1500);
    });
};

const makeDinner = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('🍖 Made dinner');
            resolve('Dinner ready');
        }, 1000);
    });
};

// Sequential execution
async function sequentialMeals() {
    console.log('\n--- Sequential Meals ---');
    const breakfast = await makeBreakfast();
    const lunch = await makeLunch();
    const dinner = await makeDinner();
    return [breakfast, lunch, dinner];
}

// Parallel execution
async function parallelMeals() {
    console.log('\n--- Parallel Meals ---');
    const meals = await Promise.all([
        makeBreakfast(),
        makeLunch(),
        makeDinner()
    ]);
    return meals;
}

// Race example
async function firstMealReady() {
    console.log('\n--- Race for First Meal ---');
    const firstMeal = await Promise.race([
        makeBreakfast(),
        makeLunch(),
        makeDinner()
    ]);
    return firstMeal;
}

// Execute all examples
async function runExamples() {
    try {
        await sequentialMeals();
        await parallelMeals();
        await firstMealReady();
    } catch (error) {
        console.error('Error:', error);
    }
}

runExamples();