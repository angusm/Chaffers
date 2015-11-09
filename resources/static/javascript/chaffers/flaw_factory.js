(function() {

    angular.module('chaffers').factory('Flaw', [
        'CharacterTrait',
        'extend',
        flawFactory
    ]);

    function flawFactory(CharacterTrait, extend) {

        function Flaw() {
            CharacterTrait.apply(this, arguments);
        }
        extend(Flaw, CharacterTrait);

        return Flaw;

    }

})();
