import createPopulatedInstance from './create_populated_instances';


/**
 * Creates new instances of the given class and populate it with data
 * @param ClassToUse
 * @param dataForPopulation
 * @returns {*}
 */
export default function createPopulatedInstances(
    ClassToUse,
    dataForPopulation
) {
    return dataForPopulation.map(function(data) {
        return createPopulatedInstance(ClassToUse, data);
    });
}