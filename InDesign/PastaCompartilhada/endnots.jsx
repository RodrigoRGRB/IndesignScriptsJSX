//DESCRIPTION: convert static (imported) endnotes to dynamic endnotes
// Peter Kahrel -- www.kahrel.plus.com

#target indesign

// Script works only in CS4 and later
if (parseInt (app.version) > 5 && app.documents.length > 0)
    {
    try {dynamic_endnotes ()}
    catch (e) {alert (e.name + ": " + e.message + "\r(line " + e.line + ")", File (e.fileName).name, true)};
    }
    

//-------------------------------------------------------------------------------------------------------------

function dynamic_endnotes ()
    {
    // endnote_styles returns a two-element object: the names
    // of the paragraph and character styles used for endnotes
    var styles = endnote_styles (app.documents[0]);
    convert_endnotes (app.documents[0], styles);
    }

function convert_endnotes (doc, styles)
    {
    app.scriptPreferences.enableRedraw = false;
    // delete phantom applications of the character style
    // (i.e. the char style applied to white space)
    phantoms (doc, styles.character);
    // check that there are as many endnote references as there are numbered notes
    if (references_match_notes (doc, styles.character, styles.paragraph))
        {
        // create variable for the numbered endnote style
        var par_style_numbered = styles.paragraph + '_numbered';
//~         var par_style_numbered = par_style;
        // add a numbered paragraph style for the first paragraph of each note
        add_par_style (doc, styles.paragraph, par_style_numbered);
        // apply the numbered note style to the paragraphs that begin with a number
        apply_numbered_style (doc, styles.paragraph, par_style_numbered);
        // add a cross-reference format
        var cr_format = add_crossref_format (doc, 'endnote', styles.character);
        // link notes and references
        crossref_notes (doc, styles.character, par_style_numbered, cr_format);
        // remove the manual numbers in the endnotes
        remove_old_numbers (doc, par_style_numbered);
        }
    }


function crossref_notes (doc, reference_style, note_style, cr_format)
    {
    var endnote_link, reference;
    var references = find_references (doc, reference_style);
    var notes = find_notes (doc, note_style);
    for (var i = references.length-1; i > -1; i--)
        {
        endnote_link = doc.paragraphDestinations.add (notes[i].insertionPoints[0]);
        reference = doc.crossReferenceSources.add (references[i].insertionPoints[0], cr_format);
        references[i].contents = "";
        doc.hyperlinks.add (reference, endnote_link, {visible: false});
        }
    doc.crossReferenceSources.everyItem().update();
    }


function remove_old_numbers (doc, p_style)
    {
    app.findGrepPreferences = app.changeGrepPreferences = null;
    app.findGrepPreferences.findWhat = '^[\\d\\s\\.]+';
    app.findGrepPreferences.appliedParagraphStyle = doc.paragraphStyles.item (p_style);
    doc.changeGrep()
    }


function add_crossref_format (doc, s, c_style)
    {
    try {doc.crossReferenceFormats.item (s).remove ()} catch (_){};
    var cr = doc.crossReferenceFormats.add ({name: s});
    cr.appliedCharacterStyle = doc.characterStyles.item (c_style);
    cr.buildingBlocks.add (BuildingBlockTypes.paragraphNumberBuildingBlock);
    return cr
    }


function add_par_style (doc, p1, p2)
    {
    try
        { // No need for this "try" as the whole script is now in a try-catch -- remove here eventually
        var p_style = app.activeDocument.paragraphStyles.add ({name: p2});
        p_style.basedOn = app.activeDocument.paragraphStyles.item (p1);
        p_style.bulletsAndNumberingListType = ListType.numberedList;
        } catch (_){};
    }


function apply_numbered_style (doc, endnote_org, endnote_numbered)
    {
    app.findGrepPreferences = null;
    app.findGrepPreferences.findWhat = '^\\d';
    app.findGrepPreferences.appliedParagraphStyle = doc.paragraphStyles.item (endnote_org);
    var f = doc.findGrep();
    if (f.length > 0)
        {
        for (var i = 0; i < f.length; i++)
            f[i].applyParagraphStyle (doc.paragraphStyles.item (endnote_numbered), false);
        }
    else
        errorM ("Cannot find any normally notes.\rPlease undo automatic numbering in the endnotes.")
    }


function references_match_notes (doc, c_style, p_style)
    {
    var m;
    var references = find_references (doc, c_style).length;
    // now count the paragraphs that start with a number and with the note style applied
    var notes = find_notes (doc, p_style).length;
    if (references != notes)
        {
        m = 'The number of endnote references does not match\rthe number of endnotes.\r';
        m += '(' + String (references) + ' references, ' + String (notes) + ' notes)';
        errorM (m);
        }
    return true
    }


function phantoms (doc, s)
    {
    if (doc.characterStyles.item (s) != null)
        {
        app.findGrepPreferences = app.changeGrepPreferences = null;
        app.findGrepPreferences.findWhat = '\\s+';
        app.findGrepPreferences.appliedCharacterStyle = doc.characterStyles.item (s);
        app.changeGrepPreferences.appliedCharacterStyle = doc.characterStyles[0];
        doc.changeGrep()
        }
    }

function find_references (doc, s)
    {
    app.findGrepPreferences = null;
    app.findGrepPreferences.appliedCharacterStyle = doc.characterStyles.item (s);
    return doc.findGrep();
    }


function find_notes (doc, s)
    {
    app.findGrepPreferences = null;
    app.findGrepPreferences.findWhat = '^.';
    app.findGrepPreferences.appliedParagraphStyle = doc.paragraphStyles.item (s);
    return doc.findGrep();
    }


//~ function check_char_style (doc, s)
//~     {
//~     if (doc.characterStyles.item (s) == null)
//~         errorM ("Can't find character style " + '"' + s + '"');
//~     }

//~ function check_par_style (doc, s)
//~     {
//~     if (doc.paragraphStyles.item (s) == null)
//~         errorM ("Can't find paragraph style " + '"' + s + '"');
//~     }


function errorM (m)
    {
    alert (m, 'Error', true);
    exit ()
    }

// The interface ----------------------------------------------------------------------------------------------------

// Get the names of the paragraph and character styles from the user.
// These names are probably those used by MS Word, so we try to find
// those styles in the document. If found, show them as defaults for the
// dropdows; if not found, use the document's basic styles.

function endnote_styles (doc)
    {
    var c_names = ['Endnote Reference',  'Endnotenzeichen', 'Appel de note de fin', 'Eindnootverwijzing'];
    var p_names = ['Endnote Text',  'Endnotentext',  'Note de fin', 'Eindnoottekst'];
    var w = new Window ('dialog', 'Dynamic endnotes');
    w.alignChildren = 'right';
    var c_styles = doc.characterStyles.everyItem().name;
    var p_styles = doc.paragraphStyles. everyItem().name;
    var panel = w.add ('panel');
//~         panel.orientation = 'column';
        panel.alignChildren = 'right';
        var gr1 = panel.add ('group');
//~             gr1.orientation = 'row';
            gr1.add ('statictext', undefined, 'Character style: ');
            var c_list = gr1.add ('dropdownlist', undefined, c_styles);
        var gr2 = panel.add ('group');
//~             gr2.orientation = 'row';
            gr2.add ('statictext', undefined, 'Paragraph style: ');
            var p_list = gr2.add ('dropdownlist', undefined, p_styles);
        
    var buttons = w.add ('group');
//~         buttons.orientation = 'row';
        buttons.add ('button', undefined, 'OK', {name: 'ok'});
        buttons.add ('button', undefined, 'Cancel', {name: 'cancel'});
        
    c_list.preferredSize = [200,22];
    p_list.preferredSize = [200,22];
    c_list.selection = find_index (c_names, c_styles)
    p_list.selection = find_index (p_names, p_styles)

    if (w.show () == 2)
        exit ();
    else
        return {character: c_list.selection.text, 
                    paragraph: p_list.selection.text}
    }


function find_index (names, styles)
    {
    var s = '£' + names.join ('£') + '£';
    for (var i = 0; i < styles.length; i++)
        if ( s.search ('£' + styles[i] + '£') > -1)
            return i
    return 0
    }
