<?php
$SoapDataTypes = array('base64Binary', 'boolean', 'byte', 'double', 'float', 'hexBinary', 'int', 'short', 'signedInt', 'string',
                       'unsignedByte', 'unsignedInt', 'unsignedShort');
$WsdlDataTypes = array('int','long','double','string','date','dateTime');

function isPrimitiveDataType($type) {
    global $SoapDataTypes;
    global $WsdlDataTypes;
    return in_array($type, $SoapDataTypes) or in_array($type, $WsdlDataTypes);
}
?>