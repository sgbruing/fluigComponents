    //FUNÇÃO DE CHAMADA DE DATASET GENÊRICA
    function getDatasetExterno(dataset, filtros, cb) {
        var retorno;
        var oauth = OAuth({
            consumer: {
                'key': 'YOUR_APP',  
                'secret': 'YOUR_SECRET_APP'
            },
            signature_method: 'HMAC-SHA1',
            hash_function(base_string, key) {
                return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
            },
            nonce_length: 6
        });

        var request_data = {
            url: WCMAPI.serverURL + '/api/public/ecm/dataset/datasets',
            method: 'POST'
        };
        
        //type of the constraint(1 - MUST, 2 - SHOULD, 3 - MUST_NOT)
        var data = {
            "name": dataset,
            "fields": [],
            "constraints": filtros,
            "order": []
        }

        var token = {
            'key': 'YOUR_KEY',
            'secret': 'YOUR_SECRET'
        }

        $.ajax({
            url: request_data.url,
            contentType: 'application/json',
            crossDomain: true,
            async: false,
            type: request_data.method,
            data: JSON.stringify(data),
            headers: oauth.toHeader(oauth.authorize(request_data, token))
        }).fail(function(e, f) {
            console.log("error!");
        }).success(function(f) {
            if (f.content.values.length > 0) {
                console.log(f.content.values);
                cb(f.content);
            } else {
            console.log("Error!");
            }
        }); 
    };		

    WCMAPI.Read({
        type: "POST",
        async: false,
        url: '/ecm-forms/api/v2/cardindex/NUMERO_FORM/cards',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({ "values": [{"fieldId": "ID_CAMPO", "value": "VALOR_CAMPO"}]}),
        success: function(data) {
            registro_form_criado = data
        },
    });
    
    let id_registro_criado = String(registro_form_criado.cardId).trim()



