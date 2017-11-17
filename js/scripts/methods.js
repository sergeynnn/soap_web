$(document).ready(function() {
		$('#get_methods').click(function() {
            $('#parameters-definition').remove();
            $('#call_method_place').css('display','none');
			$('#function_list_container').html('');
			$('.allow_methods_label').remove();
            $('#response_place').html('');
            $('#message_place').html('');

			$.get('server.php',{cmd: 'get_functions', url: $.trim($('#url').val())}, function(data) {
			    console.log(data);
				var response = JSON.parse(data);
                var currentLanguage = $('input[name="current_language"]').val();
				if(response.status == "success") {
					var functionList = response.function_list;
					if(functionList.length > 0) {
						var functionListHTML = '<ol class="ui list">';
						functionList.forEach(function(item, index) {
							var functionSignature = item.split(' ');
							var functionName = functionSignature[1];
							var functionInput = functionName.substring(parseInt(functionName.indexOf('('))+1);
							functionName = functionName.substr(0,functionName.indexOf('('));
							var functionOutput = functionSignature[0];
							functionListHTML = functionListHTML + '<li value="">'+
																	'<span data-func-number="'+index+'" class="show_params"> + </span> '+
																	'<a class="function_item" data-function-input-type="'+functionInput+'" data-function-name="'+functionName+'">'+
																		functionName+
																	'</a>'+
								                                    '<ol id="func_params_'+index+'" style="display: none" >'+
																		'<li value="">'+
																			'<a data-param-name="'+functionInput+'" class="function_params function_input">'+
																				'<i class="arrow circle outline right icon"></i>' +
																				functionInput+
																			'</a>'+
																		'</li>'+
                                										'<li value="">'+
																			'<a data-param-name="'+functionOutput+'" class="function_params function_output">'+
                                												'<i class="arrow circle outline left icon"></i>'+
																				functionOutput+
																			'</a>'+
																		'</li>'+
   																	'</ol>'
																   '</li>';
						});
						functionListHTML = functionListHTML + '</ol>';
						
						$('#function_list_container').html(functionListHTML);
                        var allowMethodsLabels = {'en_US':'Allow methods:', 'ru_RU':'Доступные методы:'};


                        var currentLanguageAllowMethodsLabel = $('<div data-en-text="'+allowMethodsLabels['en_US']+'" '+
                       												 ' data-ru-text="'+allowMethodsLabels['ru_RU']+'" '+
                       												 'class="ui lang-item pointing below blue label allow_methods_label">'+
							                                          allowMethodsLabels[currentLanguage]+
                        										 '</div>');
                        var ruLanguageAllowMethodsLabel = $('<div style="display: none" data-en-text="'+allowMethodsLabels['en_US']+'" '+
																' data-ru-text="'+allowMethodsLabels['ru_RU']+'" '+
																'class="ui lang-item pointing below blue label allow_methods_label">'+
																allowMethodsLabels['ru_RU']+
														    '</div>');
                        var enLanguageAllowMethodsLabel = $('<div style="display: none" data-en-text="'+allowMethodsLabels['en_US']+'" '+
                            									' data-ru-text="'+allowMethodsLabels['ru_RU']+'" '+
                            									'class="ui lang-item pointing below blue label allow_methods_label">'+
                           										allowMethodsLabels['en_US']+
                            								'</div>');
                        $('#function_list_container').before(enLanguageAllowMethodsLabel);
                        $('#function_list_container').before(ruLanguageAllowMethodsLabel);

                        if(parseFloat(enLanguageAllowMethodsLabel.css('width').toString().replace('px','')) > parseFloat(ruLanguageAllowMethodsLabel.css('width').toString().replace('px',''))) {
                            currentLanguageAllowMethodsLabel.css('width', enLanguageAllowMethodsLabel.css('width'));
						} else {
                            currentLanguageAllowMethodsLabel.css('width', ruLanguageAllowMethodsLabel.css('width'));
						}

                        enLanguageAllowMethodsLabel.remove();
                        ruLanguageAllowMethodsLabel.remove();

						$('#function_list_container').before(currentLanguageAllowMethodsLabel);
						var marginLeft = $('#function_list_container').children('ol.ui.list').css('margin-left');
						$('.allow_methods_label').css('margin-left',marginLeft);						  

					}
				} else {
					showError(response.message);
				}
			});
		});

		$('body').on('click', '.show_params', function() {
            $('#message_place').html('');
			var funcNumber = $(this).data('func-number');
			if($.trim($(this).html()) == '+') {
                $(this).html(' - ');
                $('#func_params_'+funcNumber).css('display','block');
			} else if($.trim($(this).html()) == '-') {
                $(this).html(' + ');
                $('#func_params_'+funcNumber).css('display','none');
			}
		});

       $('body').on('click','.function_params', function() {
           $('#message_place').html('');
            var paramName = $(this).data('param-name'), url = $.trim($('#url').val());
           $('#parameters-definition').html('');
            $.get('server.php', {cmd: 'get_type', url: url, type: paramName}, function(data) {
                $('#parameters-definition').remove();
                $('#working-container').prepend('<div id="parameters-definition"></div>');
                var response = JSON.parse(data);
                if (response.status == "success") {
					var paramsHTML = getParamsTree(response.type, false);
                    var parametersDefinitionLabels = {'en_US':'Parameters definition', 'ru_RU':'Описание параметров'};
                    var currentLanguage = $('input[name="current_language"]').val();
                    var parametersDefinitionLabelText = parametersDefinitionLabels[currentLanguage];

                    var currentLanguageParametersDefinitionLabel = $('<h4 id="parameter-definition-label" data-en-text="'+parametersDefinitionLabels['en_US']+
                    '" data-ru-text="'+parametersDefinitionLabels['ru_RU']+'" class="lang-item">'+parametersDefinitionLabelText+'</h4>');

                    var enLanguageParametersDefinitionLabel = $('<h4 style="display: none" id="parameter-definition-label" data-en-text="'+parametersDefinitionLabels['en_US']+
                        '" data-ru-text="'+parametersDefinitionLabels['ru_RU']+'" class="lang-item">'+parametersDefinitionLabels['en_US']+'</h4>');
                    var ruLanguageParametersDefinitionLabel = $('<h4 style="display: none" id="parameter-definition-label" data-en-text="'+parametersDefinitionLabels['en_US']+
                        '" data-ru-text="'+parametersDefinitionLabels['ru_RU']+'" class="lang-item">'+parametersDefinitionLabels['ru_RU']+'</h4>');

                    $('#parameters-definition').append(enLanguageParametersDefinitionLabel);
                    $('#parameters-definition').append(ruLanguageParametersDefinitionLabel);

                    if(parseFloat(enLanguageParametersDefinitionLabel.css('width').toString().replace('px','')) > parseFloat(ruLanguageParametersDefinitionLabel.css('width').toString().replace('px',''))) {
                        currentLanguageParametersDefinitionLabel.css('width', enLanguageParametersDefinitionLabel.css('width'));
					} else {
                        currentLanguageParametersDefinitionLabel.css('width', ruLanguageParametersDefinitionLabel.css('width'));
					}

                    enLanguageParametersDefinitionLabel.remove();
                    ruLanguageParametersDefinitionLabel.remove();

                    $('#parameters-definition').append(currentLanguageParametersDefinitionLabel);

                    $('#parameters-definition').append('<h4 class="parameters_name">' + paramName + '</h4>'+
						                               '<h4 id="show_hide_parameters_definition">-</h4>'+
						                               '<h4 id="close_parameters_definition">x</h4>');
                    $('#parameters-definition').append('<div id="parameters_tree" style="text-align: left">'+paramsHTML+'</div>');
                }
            });
        });

       $('body').on('click','#close_parameters_definition', function() {
           $('#parameters-definition').html('');
	   });

        $('body').on('click', '#show_hide_parameters_definition', function() {
        	switch($.trim($(this).html())) {
				case '-':
                    $(this).html('+');
                    $('#parameters_tree').css('display','none');
					break;
				case '+':
                    $(this).html('-');
                    $('#parameters_tree').css('display','block');
					break;
			}
		});

		$('body').on('click', '.show_params_sub_definition', function(data) {
			switch($.trim($(this).html())) {
				case '+':
                    $(this).html('-');
                    $(this).siblings('ol').removeClass('hide').addClass('visible');
					break;
				case '-':
                    $(this).html('+');
                    $(this).siblings('ol').removeClass('visible').addClass('hide');
                    break;
			}
		});

		$('#close_call_method_place').click(function() {
            switch($('#call_method_place').css('display')) {
				case 'block':
                    $('#call_method_place').css('display','none');
					break;
			}
		});
	});

    var getParamsTree = function(params, needFirst) {
        var resultHTML = '';
        var paramsFirstKey = getFirstKey(params);
        var paramsFirstValue = params[paramsFirstKey];
        if(paramsFirstValue.length != 0) {
            if(needFirst) {
                resultHTML += '<li value=""> <span class="show_params_sub_definition">+</span>'+'<a class="param_item">'+paramsFirstKey+'</a>';
            }
            if(!needFirst) {
                var olClass = ' class="ui list" ';
            } else {
                var olClass = ' class="hide" ';
            }
            resultHTML += '<ol '+olClass+' >';


               // resultHTML += '{}';


            paramsFirstValue.forEach(function(item, index) {
                switch (typeof item) {
                    case 'string':
                        resultHTML += '<li value=""> <span class="fictive_element">+</span>' + '<a class="param_item">' + item + '</a>' + '</li>';
                        break;
                    case 'object':
                        var subParamHTML = getParamsTree(item, true);
                        resultHTML += subParamHTML;
                        break;
                }
            });
            resultHTML += '</ol>';
            if(needFirst) {
                resultHTML += '</oli>';
            }
        } else {
            resultHTML += '<li value=""> <span class="fictive_element">+</span>' + '<a class="param_item">' + paramsFirstKey + '</a>' + '</li>';
        }
        return resultHTML;

    }