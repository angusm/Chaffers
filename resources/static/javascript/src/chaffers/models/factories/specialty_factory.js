SpecialtyFactory.$inject = [
    'CharacterTrait',
];
export default SpecialtyFactory;

function SpecialtyFactory(CharacterTrait) {
    return class Specialty extends CharacterTrait {
        static getDjangoModelName() {return 'Specialty';}
    }
}
