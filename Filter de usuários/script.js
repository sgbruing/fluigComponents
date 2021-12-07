function carregaFiltroColabs() {

    //inicializa o filter com todos os colaboradores
    var sortingFields = new Array("nome");
    var dsCol = DatasetFactory.getDataset("dsColleagueGenerico", null, null, sortingFields);
    var jsonFilterCC = [];

    var settings = {
        source: dsCol.values,
        displayKey: 'login_nome',
        multiSelect: false,
        minLength: 3,
        style: {
            autocompleteTagClass: 'tag-gray',
            tableSelectedLineClass: 'info'
        },
        table: {
            header: [{
                'title': 'Matrícula / Nome',
                'size': 'col-xs-12',
                'dataorder': 'nome',
                'standard': true
            }],
            renderContent: ['login_nome']
        }
    }

    inputFilterRespAcao = FLUIGC.filter('#resp_acao_corretiva', settings); 

};

$(document).on("change", '#resp_acao_corretiva', function(e) {

    if (inputFilterRespAcao.getSelectedItems().length > 0) {

        load.show();
    
        var empMatRespAcao = $('#resp_acao_corretiva').val().split("/")[0]
        var nomeRespAcao = $('#resp_acao_corretiva').val().split("/")[1]
        var empCodeRespAcao = empMatRespAcao.split("-")[0].trim()
        var matRespAcao = empMatRespAcao.split("-")[1].trim()
    
        FormNaoConformidades.getDadosRespAcaoCorretiva(empCodeRespAcao, matRespAcao); //completa os campos de setor e cargo do responsável pela ação
    
        load.hide();    

    } 

});


/* CÓDIGO WIDGET 

    getDadosRespAcaoCorretiva: function (empresa, matricula) {

        // API  que retorna os dados do responsável do colaborador 
        $.ajax({
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            url: '/api/public/ecm/dataset/search?datasetId=dsEnquadramentoDados&filterFields=Emp,' + String(empresa) + ',Mat,' + String(matricula) + '',
            success: function(data, status, xhr) {

                if(data.content[0] != undefined){

                    $('#cc_resp_acao_corretiva').val(data.content[0].UNOR_COD + "-" + data.content[0].UNOR_NOME);
                    $('#cargo_resp_acao_corretiva').val(data.content[0].CARG_COD + "-" + data.content[0].CARG_NOME);

                } else{
                    
                    FLUIGC.toast({
                        message: 'Matrícula não encontrada!',
                        type: 'danger'
                    });
                }

            },
            error: function (xhr, status, error) {
                FLUIGC.toast({
                    message: 'Erro ao encontrar os dados do colaborador: APi get_initial_data_framing:' + status + '',
                    type: 'danger'
                });
            },
            async: true
        }); 
    },

*/