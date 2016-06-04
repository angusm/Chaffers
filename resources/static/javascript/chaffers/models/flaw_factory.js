(function() {

    angular.module('chaffers').factory('Flaw', [
        'CharacterTrait',
        'extend',
        flawFactory
    ]);

    function flawFactory(CharacterTrait, extend) {

        function Flaw() {
            this.callSuper('constructor');
        }
        extend(Flaw, CharacterTrait);

        return Flaw;

    }

})();
