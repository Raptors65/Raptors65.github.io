MathJax = {
  tex: {packages: {'[+]': ['input']}},
  startup: {
    ready() {
      const Configuration = MathJax._.input.tex.Configuration.Configuration;
      const CommandMap = MathJax._.input.tex.SymbolMap.CommandMap;
      const TEXCLASS = MathJax._.core.MmlTree.MmlNode.TEXCLASS;
      
      new CommandMap('input', {input: 'Input'}, {
        Input(parser, name) {
          const xml = parser.create('node', 'XML');
          const id = parser.GetBrackets(name, '');
          const left = parser.GetBrackets(name, '');
          const size = parser.GetBrackets(name, '16px');
          const w = parser.GetBrackets(name, '5em');
          const value = parser.GetArgument(name);
          xml.setXML(MathJax.startup.adaptor.node('input', {
            id: id, value: value, style: {left, position: "relative", fontSize: size, width: w}, xmlns: 'http://www.w3.org/1999/xhtml'
          }), MathJax.startup.adaptor);
          xml.getSerializedXML = function () {
            return this.adaptor.outerHTML(this.xml) + '</input>';
          }
          parser.Push(
            parser.create('node', 'TeXAtom', [
              parser.create('node', 'semantics', [
                parser.create('node', 'annotation-xml', [
                  xml
                ], {encoding: 'application/xhtml+xml'})
              ])
            ], {texClass: TEXCLASS.ORD})
          );
        }
      });
      Configuration.create('input', {handler: {macro: ['input']}});

      MathJax.startup.defaultReady();
    }
  }
};

function enterAnswer() {
  if (checkAnswer()) {
    window.location = nextQuestion;
    window.location.assign(nextQuestion);
  }
}