<?php 

/* 
    Created on : 09-Sep-2014
    Author     : Xinchro
*/

//$xml = new DOMDocument();
//$xml->formatOutput = true;
//$xml_album = $xml->createElement("Album");
//$xml_track = $xml->createElement("Track");
//$xml_album->appendChild( $xml_track );
//$xml_track->attributes
//$xml->appendChild( $xml_album );
//
//$xml->save("/tmp/test.xml");

//name, desc, type, img, effect

//$writer = new XMLWriter();  
//
//$writer->openURI('php://output');   
//$writer->startDocument('1.0','UTF-8');   
//$writer->setIndent(4);   
//$writer->startElement('items');  
//$writer->startElement("main");  
//$writer->writeElement('name', "light");  
//$writer->writeElement('desc', "light thing");  
//$writer->writeElement('type', 0);  
//$writer->writeElement('img', "thing.svg");  
//$writer->endElement();   
//$writer->startElement("msg");  
//$writer->writeAttribute('category', 'test');  
//$writer->endElement();     
//$writer->endElement();   
//$writer->endDocument();   
//$writer->flush(); 
//
//
//

  $swordParts = array();
  $swordParts [] = array(
  'name' => 'Light Blade',
  'desc' => 'I am light.',
  'type' => 0
  );
  $swordParts [] = array(
  'name' => 'Curved Blade',
  'desc' => 'I am curved.',
  'type' => 0
  );
  
//  EquippableItemPart.call(this, "Curved Blade", "I am curved.", type, "bladeCurved.svg");
//  function LightBlade(){
//    EquippableItemPart.call(this, "Light Blade", "I am light.", type, "bladeLight.svg");
//};
//LightBlade.prototype = new EquippableItemPart;
//LightBlade.prototype.constructor = LightBlade;
//LightBlade.prototype.effect = function(){return "";};
//swordBlades.push(LightBlade);
  
  
  $doc = new DOMDocument();
  $doc->formatOutput = true;
  
  $r = $doc->createElement( "parts" );
  $doc->appendChild( $r );
  
  foreach( $swordParts as $employee )
  {
  $b = $doc->createElement( "part" );
  
  $name = $doc->createElement( "name" );
  $name->appendChild(
  $doc->createTextNode( $employee['name'] )
  );
  $b->appendChild( $name );
  
  $age = $doc->createElement( "desc" );
  $age->appendChild(
  $doc->createTextNode( $employee['desc'] )
  );
  $b->appendChild( $age );
  
  $salary = $doc->createElement( "type" );
  $salary->appendChild(
  $doc->createTextNode( $employee['type'] )
  );
  $b->appendChild( $salary );
  
  $r->appendChild( $b );
  }
  
  echo $doc->saveXML();
  $doc->save("parts.xml")
  ?> 