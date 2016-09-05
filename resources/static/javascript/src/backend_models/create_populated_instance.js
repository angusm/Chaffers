import populateInstance from './populate_instance';


export default function createPopulatedInstance(ClassToUse, dataForPopulation) {
    let createdInstance = new ClassToUse();
    populateInstance(createdInstance, dataForPopulation);
    return createdInstance;
}
