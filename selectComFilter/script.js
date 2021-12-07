function carregaSelects() { 

    //configuração inicial dos select2
    $.fn.select2.defaults.set("language", "pt-BR");
    $('.select2').select2();
    $('.select2-selection__arrow').html('<i class="fa fa-angle-down"></i>');

    //preenchimento das opções do select2 de empresas com a lista de empresas
    $('#empresaObservador').select2(listEmpresa);
    $('.select2').trigger('change.select2');

    $('#empresaObservador').on('change', function(event) {
        load.show();
        if ($('#empresaObservador').val()) {

            $("#filialObservador").val('');
            $("#filialObservador").empty().trigger("change.select2");

            $("#filialObservador").select2(getFiliais($('#empresaObservador').val()));

            $("#filialObservador").prop("disabled", false);
        }
        load.hide();
    });

    $('#filialObservador').on('change', function() {

        load.show();
        if ($('#filialObservador').val()) {

            $("#setorObservador").val('');
            $("#setorObservador").empty().trigger("change.select2");

            $("#setorObservador").select2(
                getCentrosCustos(
                    $('#empresaObservador').val(),
                    $('#filialObservador').val())
            );
                
            $("#setorObservador").prop("disabled", false);

        }
        load.hide();
    });

}

function getEmpresas() {
    return DatasetFactory.getDataset("dsEmpresas", null, null, null);
}

function getFiliais(idEmpresa) {
    var cCodEmpresa = DatasetFactory.createConstraint("empresa", idEmpresa, idEmpresa, ConstraintType.MUST)
    var ds = DatasetFactory.getDataset("ds_GetFilialPorEmpresa", null, [cCodEmpresa], null);

    if (ds == undefined || ds.values.length == 0) {
        FLUIGC.toast({
            title: 'Atenção:',
            message: 'Não foi possível encontrar as filiais da empresa selecionada. Verifique.',
            type: 'warning',
            timeout: 9000
        });
    }

    return dsToSelect2(ds.values, 'fil_cod', 'filial', 'emp_cod', 'fil_cod');
}

function getCentrosCustos(idEmpresa, id_filial) {

    var cIdEmpresa = DatasetFactory.createConstraint("emp", idEmpresa, idEmpresa, ConstraintType.MUST);
    var cIdFilial = DatasetFactory.createConstraint("filial", id_filial, id_filial, ConstraintType.MUST);
    var ds = DatasetFactory.getDataset("dsGetSetorCC", null, [cIdEmpresa, cIdFilial], null);

    if (ds == undefined || ds.values.length == 0) {
        FLUIGC.toast({
            title: 'Atenção:',
            message: 'Não foi possível encontrar Centro(s) de Custo(s) para a empresa e filial selecionadas. Verifique.',
            type: 'warning'
        });
    }

    return dsToSelect2(ds.values, 'cod', 'uo.cod', 'uo.cod');

}

function dsToSelect2(list, id, text, toSort, toConcat = false) {

    var listToReturn = [{ id: "", text: "Selecione" }];
    list.forEach(element => {
        listToReturn.push({ id: element[id], text: (toConcat == false) ? element[text] : element[toConcat] + ' / ' + element[text] });
    });

    return { data: listToReturn };
}


/* SE FOR UMA WIDGET
        
    getEmpresas: function () {

        return DatasetFactory.getDataset("dsEmpresas", null, null, null);

    },

    getFiliais: function (id_empresa) {

        var cCodEmpresa = DatasetFactory.createConstraint("empresa", id_empresa, id_empresa, ConstraintType.MUST)
        var ds = DatasetFactory.getDataset("ds_GetFilialPorEmpresa", null, [cCodEmpresa], null);

        if (ds == undefined || ds.values.length == 0) {
            FLUIGC.toast({
                title: 'Atenção:',
                message: 'Não foi possível encontrar as filiais da empresa selecionada. Verifique.',
                type: 'warning',
                timeout: 9000
            });
        }

        return this.dsToSelect2(ds.values, 'fil_cod', 'filial', 'emp_cod', 'fil_cod');

    },

    getCentrosCustos: function (id_empresa, id_filial) {

        var cIdEmpresa = DatasetFactory.createConstraint("emp", id_empresa, id_empresa, ConstraintType.MUST);
        var cIdFilial = DatasetFactory.createConstraint("filial", id_filial, id_filial, ConstraintType.MUST);
        var ds = DatasetFactory.getDataset("dsGetSetorCC", null, [cIdEmpresa, cIdFilial], null);

        if (ds == undefined || ds.values.length == 0) {
            FLUIGC.toast({
                title: 'Atenção:',
                message: 'Não foi possível encontrar Centro(s) de Custo(s) para a empresa e filial selecionadas. Verifique.',
                type: 'warning'
            });
        }

        return this.dsToSelect2(ds.values, 'cod', 'uo.cod', 'uo.cod');
        
    },
        
        */