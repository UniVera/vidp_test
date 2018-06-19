# vidp_test
Test-Umgebung für die OntoWiki-basierte Entwicklung einer Video-Plattform
<<<<<<< HEAD
geht
=======

### Installieren und Einrichten der Site-Extension
Als Grundlage dient das Wiki des entsprechenden Repositorys. (https://github.com/AKSW/site.ontowiki/wiki)

1.	Clone Extension von GitHub nach <ontowikiroot>/extensions
(Innerhalb des Verzeichnisses <ontowikiroot>/extensions
“git clone https://github.com/AKSW/site.ontowiki.git site” ausführen);
2.	Neue (leere) Knowledge Base erstellen;
3.	Die Source Codes der neuen Knowledge Base öffnen
(„View all Ressources“  Reiter „Source“);
4.	Inhalte der Datei model.n3 in <ontowikiroot>/extensions/site/sites/example/data/model.n3 außer der @base-Zeile (@base <http://localhost/Site>) kopieren und in Source Codes beim Schritt 3 einsetzen;
5.	Die Datei <ontowikiroot>/extensions/site/sites/example/config.ini entsprechend anpassen
(model = "@base-URI der Knowledge Base")
6.	Eine Datei <ontowikiroot>/extensions/site.ini mit dem Inhalt enabled = true; erstellen;
7.	Innerhalb des Verzeichnisses <ontowikiroot>/extensions/site/sites/, den Ordner „example“ kopieren und umbenennen (z.B. „local“);
8.	„Name“-Feld in der Datei <ontowikiroot>/extensions/site/sites/local/config.ini ändern (Name für Tab)
9.	Das Feld „defaultSite“ im „[private]“-Teil der Datei <ontowikiroot>/extensions/site.ini mit dem neuen Namen („local“) aktualisieren (in diesem Fall defaultSite = "local").


### Inhalte aus der Knowledge Base darstellen
Inhalte können grundsätzlich nur mithilfe von SPARQL-Abfragen dargestellt werden.
Der Code muss im entsprechenden Site Model implementiert werden. Hier: ``` /var/www/html/OntoWiki/extensions/site/sites/local/types ```

```php
<?php
    $headlineQuery = 'PREFIX vidp: <https://bmake.th-brandenburg.de/vidp#>' . PHP_EOL;
    $headlineQuery.= 'PREFIX schema: <https://schema.org/>' . PHP_EOL;
    $headlineQuery.= 'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>' . PHP_EOL;
    $headlineQuery.= 'SELECT ?videoLecture' . PHP_EOL;
    $headlineQuery.= 'WHERE {?videoLecture rdf:type vidp:VideoLecture.' . PHP_EOL;
    $headlineQuery.= '}' . PHP_EOL;
?>

<h4><?= $this->_('Video Lectures') ?></h4>
<ul>
   <?= $this->querylist($headlineQuery, 'local/types/person.phtml', array(), array('prefix' => '<li>', 'suffix' => '</li>')) ?>

</ul>
<!--    <?php
	echo $headlineQuery->literal(array('property' => 'schema:headline'));
    ?>
```
Im oberen Teil erfolgt die Einbindung des entsprechenden Models, Schemas usw. Im unteren Teil erfolgt die eigentliche Abfrage auf Basis von SPARQL.
>>>>>>> Update README.md
