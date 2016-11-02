SpecialtyFactory.$inject = [
    'CharacterTrait',
];
let Specialty;
export default SpecialtyFactory;

function SpecialtyFactory(CharacterTrait) {
    Specialty = Specialty || class Specialty extends CharacterTrait {
        static getModelName() {return 'Specialty';}
    };
    return Specialty;
}
