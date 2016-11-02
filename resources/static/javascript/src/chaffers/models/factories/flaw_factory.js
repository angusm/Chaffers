FlawFactory.$inject = [
    'CharacterTrait',
];
let Flaw;
export default FlawFactory;

function FlawFactory(CharacterTrait) {
    Flaw = Flaw || class Flaw extends CharacterTrait {
        static getModelName() {return 'Flaw';}
    };
    return Flaw;
}
