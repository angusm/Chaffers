FlawFactory.$inject = [
    'CharacterTrait',
];
export default FlawFactory;

function FlawFactory(CharacterTrait) {
    return class Flaw extends CharacterTrait {
        static getModelName() {return 'Flaw';}
    }
}
