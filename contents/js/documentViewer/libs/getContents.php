<?php

//I'm intentionally suppressing errors. If there is an error, we assume it is because the file can not be found
$file = @file_get_contents($_POST['file']);


if($file !== false){
    echo json_encode(
        array(
              'status'=>'success',
              'response' => htmlentities($file)
         )
    );
}
else{
    echo json_encode(
        array(
            'status'=>'error',
            'response'=>'Not Found'
        )
    );
}