angular.module('showcase.withResponsive', ['datatables'])
.controller('WithResponsiveCtrl', WithResponsiveCtrl);

function WithResponsiveCtrl(DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.dtOptions = DTOptionsBuilder.fromSource('')
        .withPaginationType('full_numbers')
        // Active Responsive plugin
        .withOption('responsive', true);
    vm.dtColumns = [
        DTColumnBuilder.newColumn('actions').withTitle('Actions'),
        DTColumnBuilder.newColumn('username').withTitle('UserName'),
		DTColumnBuilder.newColumn('password').withTitle('Password'),
		DTColumnBuilder.newColumn('email').withTitle('Email'),
        // .notVisible() does not work in this case. Use .withClass('none') instead
        DTColumnBuilder.newColumn('role').withTitle('Role').withClass('none')
    ];
}