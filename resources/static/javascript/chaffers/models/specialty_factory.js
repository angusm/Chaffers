(() => {

    angular.module('chaffers').factory('Specialty', [
        'CharacterTrait',
        'extend',
        specialtyFactory
    ]);

    function specialtyFactory(CharacterTrait, extend) {

        function Specialty() {
            this.callSuper('constructor');
        }
        extend(Specialty, CharacterTrait);

        return Specialty;

    }

})();
