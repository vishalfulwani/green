const getRandomElements = (arr: any, numElements: number) => {
    if (numElements > arr.length) {
        console.log("Number of elements requested exceeds the array length.");
    }
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numElements);
}
export default getRandomElements