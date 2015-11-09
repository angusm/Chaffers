(function() {

    angular.module('chaffers').factory('Specialty', [
        'CharacterTrait',
        'extend',
        specialtyFactory
    ]);

    function specialtyFactory(CharacterTrait, extend) {

        function Specialty() {
            CharacterTrait.apply(this, arguments);
        }

        extend(Specialty, CharacterTrait);

        return Specialty;

    }

})();
