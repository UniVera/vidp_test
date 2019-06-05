# Alle SparQL-Queries für Videoplattform

Hier werden alle Queries, die für Videoplattform verwendet werden, zusammengefasst. Um die Queries auszuführen, muss zuerst eine Videovorlesung spezifiziert werden. Hier als Beipiel wird die Vorlesung Grundlagen der Prozessmodellierung (BPMN1) eingesetzt. Komplette Präfixe findet man in den obigen .rq-Dateien.

### aboutQuery.rq
Query, um herauszufinden, zu welchem Modul eine Videovorlesung gehört (befindet sich unter `/vidp/types/videoLecture/videoLecture.phtml`).
Ergebnisse der Query werden mithilfe von `/vidp/types/videoLecture/aboutQuery.phtml` angezeigt.
```
SELECT ?about
WHERE {
	vide:BPMN1	schema:about	?about .
}
```

### clipInfo.rq
Query, um die relevanten Informationen über Video-Clips abzufragen (befindet sich unter `/vidp/types/videoLecture/videoLecture.phtml`).
Ergebnisse werden nach Clip-Label sortiert und mithilfe von `/vidp/types/videoLecture/clipInfo.phtml` angezeigt.
```
SELECT ?headlineclips ?labelclips ?urlclips ?durationclips ?dateClips
WHERE {    
	?doubleclips 	a 			vidp:DoubleClip;
			schema:isPartOf 	vide:BPMN1;
			schema:headline		?headlineclips;
			schema:duration		?durationclips;
			rdfs:label			?labelclips;
	        schema:dateCreated 	?dateClips ;
	        schema:url 			?urlclips.
}
ORDER BY ASC( ?labelclips )
```

### filterLecturer.rq, filterModule.rq, filterStudyProgram.rq
Queries um alle Varianten der Dozenten/innen, Module und Studiengäng als FIlter-Kriterien zu ermitteln (befinden sich unter `/vidp/types/videoLectureList/videoLectures.phtml`).
Ergebnisse werden mithilfe von `/vidp/types/videoLectureList/filterNames.phtml` angezeigt.

#### Lecturer
```
SELECT DISTINCT ?lecturer
WHERE {
	?lecturerURI	a 	vidp:Lecturer ;
			rdfs:label	?lecturer .
}
```
#### Module
```
SELECT DISTINCT ?module
WHERE {
	?moduleUri 	a 	vidp:Module ;
			rdfs:label 	?module .
}
```
#### Studiengänge
```
SELECT DISTINCT ?studyProgram
WHERE {
	?studyProgramUri	a	vidp:StudyProgram ;
					rdfs:label 	?studyProgram .
}
```

### moduleInfo.rq
Query, um Modulname sowie den THB-Link des Moduls herauszufinden (befindet sich unter `/vidp/types/videoLecture/aboutQuery.phtml`).
Ergebnisse werden mithilfe von `/vidp/types/videoLecture/moduleInfo.phtml` angezeigt.
```
SELECT ?label ?url
WHERE {
	vide:PZMD schema:url ?url ;
	rdfs:label ?label .
}
```

### videoDurationContributor.rq
Query, um die Dauer, Creator sowie ggf. Contributor (falls vorhanden) aller Video-Clips abzufragen (befindet sich unter `vidp/types/videoLectureList/videoLectureElement.phtml`).
Ergebnisse werden mithilfe von `/vidp/types/videoLectureList/videoDurationContributor.phtml` angezeigt.
```
SELECT ?durationclips ?contributorname ?creatorname
WHERE { 
	?clips	a	vidp:DoubleClip ;
			schema:isPartOf vide:BPMN1 ;
			schema:duration	?durationclips ; 
	 		schema:creator 	?creator .
	?creator rdfs:label	?creatorname.
	 OPTIONAL { 
		?clips 	schema:contributor	?contributor.
	 	?contributor	rdfs:label 	?contributorname.
	}
}
```

### videoInfo.rq
Query um die Informationen über eine Videovorlesung zu ermitteln (befindet sich unter `/vidp/types/videoLecture/videoLecture.phtml`). Nur die deutsche Bezeichnung der Videovorlesung wird erscheinen.
Ergebnisse werden mithilfe von `/vidp/types/videoLecture/videoInfo.phtml` angezeigt.
```
SELECT ?description ?url ?headline ?thumbnail
WHERE {
	vide:BPMN1 	schema:description 	?description ;
			schema:headline 	?headline ;
			schema:url 			?url ; 
			schema:inLanguage 	?language ;
			schema:thumbnail 	?logo .
	?logo 	schema:identifier 	?thumbnail .
	FILTER ( lang(?headline) = ?language)
}
```

### videoLectureSearchFilter.rq
Query für Such- und Filterfunktion (befindet sich unter `/vidp/types/videoLectureList/videoLectures.phtml`).
Ergebnisse werden mithilfe von `/vidp/types/videoLectureList/videoLectureElement.phtml` angezeigt.
```
SELECT DISTINCT ?videoLecture ?headline ?thumbnail ?label ?description ?language
WHERE { 
	?videoLecture 	a 			vidp:VideoLecture ;
			schema:description	?description ;
			schema:thumbnail 	?logo ;
			schema:inLanguage 	?language ;
			rdfs:label 		?label ;
			schema:keywords 	?keywords;
			schema:headline 	?headline .
	?logo 		schema:identifier 	?thumbnail .
	?videoLecture 	a 			vidp:VideoLecture;
			schema:about 		?modul.
	?modul 		a 			vidp:Module;
			rdfs:label 		?modul_label ;
			schema:isPartOf 	?studyProgram .
	?studyProgram 	rdfs:label 		?labelStudyProgram .
	FILTER ( lang(?headline) = "de" )
	?doubleClip 	schema:isPartOf 	?videoLecture .
	{
		?doubleClip 	schema:creator 		?creator .
		?creator 	rdfs:label 		?nameCreator.
		FILTER ( CONTAINS(?nameCreator, "Laura"))
	} UNION {
		?doubleClip 	schema:contributor 	?contributor . 
		?contributor 	rdfs:label 		?nameContributor .
		FILTER ( CONTAINS(?nameContributor, "Laura") )
	}
	FILTER ( ?language = "en" )
	FILTER ( CONTAINS(?modul_label, "Grundlagen der Prozessmodellierung") )
	FILTER ( CONTAINS(?labelStudyProgram, "Bachelor Wirtschaftsinformatik") )
	FILTER ( REGEX(?keywords, "bpmn", "i") || REGEX(?headline, "bpmn", "i") || REGEX(?description, "bpmn", "i") )
}
ORDER BY ?videoLecture
```
