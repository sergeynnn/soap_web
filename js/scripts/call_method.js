$(document).ready(function() {
    $('body').on('click','.function_item', function() {
        var functionInput = $(this).data('function-input-type');
        var url = $.trim($('#url').val());
        var functionName = $(this).data('function-name');
        $('#response_place').html('');
        $.get('server.php', {cmd: 'get_type', type: functionInput, url: url}, function(data) {
            var response = JSON.parse(data);
            $('#parameters-definition').remove();
            $('#call_method').data('method-name', functionName);
            $('#call_method_place').css('display','block');
            $('#method_name').html(' '+functionName+' ');
            $('#method_parameter_label').remove();
            $('#call_method').remove();
            var currentLanguage = $('input[name="current_language"]').val();

            var callMethodBtnLabels = {'en_US':'Call','ru_RU': 'Вызвать'};
            var currentLanguageCallMethodBtnLabel = callMethodBtnLabels[currentLanguage];

            var callMethodBtn = $('<div id="call_method" class="lang-item ui download primary button right floated" '+
                                        ' data-en-text="'+callMethodBtnLabels['en_US']+'" data-ru-text="'+callMethodBtnLabels['ru_RU']+'">'+currentLanguageCallMethodBtnLabel+'</div>');

            var methodParametersLabels = {'en_US':'Parameters:','ru_RU': 'Параметры:'};
            var currentLanguageMethodParametersLabel = methodParametersLabels[currentLanguage];

            var methodParametersLabel = $('<h4 class="lang-item ui header" data-en-text="'+methodParametersLabels['en_US']+'" ' +
                                        ' data-ru-text="'+methodParametersLabels['ru_RU']+'" id="method_parameter_label">'+currentLanguageMethodParametersLabel+'</h4>');

            $('#method_parameters').before(methodParametersLabel);
            $('#method_parameters').before(callMethodBtn);

            var callMethodRuBtn = $('<div id="call_ru_method" class="lang-item ui download primary button right floated"'+
                                        ' data-en-text="'+callMethodBtnLabels['en_US']+'" data-ru-text="'+callMethodBtnLabels['ru_RU']+'">'+callMethodBtnLabels['ru_RU']+'</div>');
            callMethodRuBtn.css('display','none');
            callMethodRuBtn.html($('#call_method').data('ru-text'));
            $('body').append(callMethodRuBtn);

            var callMethodEnBtn = $('<div id="call_en_method" class="lang-item ui download primary button right floated" '+
                                    ' data-en-text="'+callMethodBtnLabels['en_US']+'" data-ru-text="'+callMethodBtnLabels['ru_RU']+'">'+callMethodBtnLabels['en_US']+'</div>');
            callMethodEnBtn.css('display','none');
            callMethodEnBtn.html($('#call_method').data('en-text'))
            $('body').append(callMethodEnBtn);

            if(parseFloat(callMethodRuBtn.css('width').toString().replace('px','')) > parseFloat(callMethodEnBtn.css('width').toString().replace('px',''))) {
                $('#call_method').css('width', callMethodRuBtn.css('width'))
            } else {
                $('#call_method').css('width', callMethodEnBtn.css('width'))
            }
            callMethodRuBtn.remove();
            callMethodEnBtn.remove();

            var paramsHTML = getParamsTreeForMethodCall(response.type, 0);

            var intermediate_html = $(paramsHTML);
            intermediate_html.attr('id','intermediate_html')
            intermediate_html.css('visibility','hidden');
            $('body').append(intermediate_html);
            intermediate_html.find('.internal-list').each(function(index, item) {

                var children = Array.prototype.slice.call(item.childNodes);
                var childrenWidths = [];
                children.forEach(function(item, index) {
                        if($(item).hasClass('primitive_parameter')) {
                            var width = Math.ceil($(item).find('a.param_item').css('width').replace('px',''))+1;
                            childrenWidths.push(width);
                        }
                });
                if(childrenWidths.length > 0) {
                    var maxChildrenWidth = Math.max.apply(null, childrenWidths);
                    children.forEach(function(item, index) {
                       if($(item).hasClass('primitive_parameter')) {
                           $(item).find('a.param_item').css({'width':maxChildrenWidth+'px', 'display': 'inline-block'});
                       }
                    });
                }
            });
            intermediate_html.css('visibility','');
            intermediate_html.removeAttr('id');

            $('#method_parameters').html(intermediate_html[0].outerHTML);
            intermediate_html.remove();
        })
    });

    $('body').on('click', '.remove_primitive_parameter', function() {
        $(this).parent().parent().remove();
    });

    $('body').on('click', '.remove_parameter_group', function() {
        $(this).parent().remove();
    });

    $('body').on('click','#call_method', function() {
        if($('ol.first-param-node').length == 0) {
            var parameters = parseParamTree($($('#method_parameters').children()[0]), true);
        } else {
            var parameters = parseParamTree($('ol.first-param-node'), false);
        }

        var data = {cmd: 'call_method', 'parameters': parameters, url: $.trim($('#url').val()), method: $.trim($('#method_name').html())};
        var currentLanguage = $('input[name="current_language"]').val();
        $('#response_place').html('');
        $('#message_place').html('');
        $.post('server.php', data, function(data) {
            try {
                var response = JSON.parse(data);
                if(response.status == 'success') {
                    var responseHTML = parseResponseTree(response.result, false, true);

                    var responseLabels = {'en_US':'Response:','ru_RU': 'Ответ:'};
                    var currentLanguageResponseLabel = responseLabels[currentLanguage];
                    $('#response_place').html('<div id="response_label_row">'+
                                                '<h4 class="lang-item" data-en-text="'+responseLabels['en_US']+'" '+
                                                ' data-ru-text="'+responseLabels['ru_RU']+'" '+
                                                ' id="response_label">'+currentLanguageResponseLabel+'</h4>'+
                                                '<span id="close_response_tree" class="right floated">x</span>'+
                                              '</div>'+
                                              '<div id="response">'+responseHTML+'</div>');
                } else {
                    showError(response.message)
                }
            } catch(e) {
                showError('Error, please try later.');
            }

        })
    });

    $('body').on('click', '#close_response_tree', function() {
        $('#response_place').html('');
    });

    $('body').on('click','span.show_response_sub_definition', function() {
        switch($.trim($(this).html())) {
            case '-':
                $(this).html('+');
                $(this).siblings('ol').css('display','none')
                break;
            case '+':
                $(this).html('-');
                $(this).siblings('ol').css('display','block')
                break;
        }
    });

})

var parseResponseTree = function(response, needOffset, needToShow) {
    var offsetClass;
    if(needOffset) {
        offsetClass = ' response-list ';
    } else {
        offsetClass = '';
    }

    var visibility;
    if(!needToShow) {
        visibility = ' invisible ';
    } else {
        visibility = '';
    }
    var resultHTML = '<ol class="ui list '+offsetClass+' '+visibility+' ">';
    for(var key in response) {
        if(typeof(response[key]) == 'object') {
            var isNumericKey = $.isNumeric($.trim(key));
            var showSubResponse = '';
            if(isNumericKey) {
                showSubResponse = '+';
            } else {
                showSubResponse = '-';
            }
            resultHTML += '<li value=""> <span class="show_response_sub_definition">'+showSubResponse+'</span><a class="response_item">'+key+'</a>';
            var subResultHTML = parseResponseTree(response[key], true, !isNumericKey);
            resultHTML += subResultHTML;
        } else {
            resultHTML += '<li value="" class="request_primitive"> <a class="response_item">'+key+': '+response[key]+'</a>';
        }

         resultHTML += '</li>';
    }
    resultHTML += '</ol>';
    return resultHTML;
}

var getParamsTreeForMethodCall = function(params, level) {
    var resultHTML = '';
    var paramsFirstKey = getFirstKey(params);
    var paramsFirstValue = params[paramsFirstKey];
    if(paramsFirstValue.length != 0) {
        var removeParameterGroup = '';
        if(level > 1) {
            removeParameterGroup = '<span class="remove_parameter remove_parameter_group">x</span>';
        } else {
            removeParameterGroup = '';
        }

        if(level > 0) {
            resultHTML += '<li value=""> <span class="show_params_sub_definition">-</span>'+'<a class="param_item">'+paramsFirstKey+'</a>'+removeParameterGroup;
        }

        var internalListClass = '';
        if(level > 0) {
            internalListClass = ' internal-list ';
        } else {
            internalListClass = '';
        }

        var isFirstParamNode = '';
        if(level == 1) {
            isFirstParamNode = ' first-param-node ';
        } else {
            isFirstParamNode = ' ';
        }

        resultHTML += '<ol data-param-signature="'+paramsFirstKey+'" class="ui list param-list ' + internalListClass + ' ' + isFirstParamNode + '" >';

          //  resultHTML += '{}';
        paramsFirstValue.forEach(function(item, index) {
            switch (typeof item) {
                case 'string':
                    resultHTML += '<li class="primitive_parameter" value=""> ' + '<a style="text-align: right" class="param_item" data-param-name="'+item+'"> <span class="remove_parameter remove_primitive_parameter">x</span>' + item + ':</a> '+
                                                                                            '<div class="ui input method-param-input">'+
                                                                                                '<input class="method-param-input" type="text">'+
                                                                                            '</div>' +
                                  '</li>';
                    break;
                case 'object':
                    var subParamHTML = getParamsTreeForMethodCall(item,  level+1);
                    resultHTML += subParamHTML;
                    break;
            }
        });
        resultHTML += '</ol>';
        if(level > 0) {
            resultHTML += '</oli>';
        }
    } else {
        resultHTML += '<li class="primitive_parameter" value=""> ' + '<a style="text-align: right" class="param_item" data-param-name="'+paramsFirstKey+'"> <span class="remove_parameter remove_primitive_parameter">x</span>' + paramsFirstKey + ':</a> '+
            '<div class="ui input method-param-input">'+
            '<input class="method-param-input" type="text">'+
            '</div>' +
            '</li>';
    }
    return resultHTML;
}

var parseParamTree = function(node, isSimple) {
    var result = {};
    var subParams = {};
    if(!isSimple) {
        var key = $.trim(node.data('param-signature').toString()).split(' ')[1];
    }
    var children = Array.prototype.slice.call(node[0].childNodes);
    children.forEach(function(item, index) {

        if($(item).hasClass('primitive_parameter')) {
            var subKey =  $.trim($(item).children('a').data('param-name').toString()).split(' ')[1];
            var subValue = $(item).find('input').val();
            subParams[subKey] = subValue;
        } else {
            var subChildren = Array.prototype.slice.call(item.childNodes);
            subChildren.forEach(function(subItem, subIndex) {
                if(subItem.tagName == 'OL' && $(subItem).hasClass('param-list')) {
                    var innerSubParams = parseParamTree($(subItem), false);
                    var innerSubKey = getFirstKey(innerSubParams);
                    var innerSubValue = innerSubParams[innerSubKey];
                    subParams[innerSubKey] = innerSubValue;
                    return false;
                }
            });
        }
    });
    if(!isSimple) {
        result[key] = subParams;
        return result;
    } else {
        return subParams;
    }

}