import React, { useState, useEffect } from 'react';
import CB from '@theme/CodeBlock';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface Props {
  file: string;
  snippet_name: string;
}

export default function CodeBlock(props: Props): JSX.Element {

  const [code, setCode] = useState("code");
  const [link, setLink] = useState("link");

  const {
    siteConfig: {customFields},
  } = useDocusaurusContext();

  const branch: string = customFields.branch=='main' ? 'main': 'dev';
 
  useEffect(() => {
    const fetchData = async () => {
      
      const basicURL = 'https://github.com/CompassLabs/dojo_examples/blob/'+branch+'/'+props.file;
      const rawURL = 'https://raw.githubusercontent.com/CompassLabs/dojo_examples/'+branch+'/'+props.file;

      const test = await fetch(rawURL);
      const result = await test.text();
      const lines = result.trim().split('\n');
      let start=0;
      let end=0;
      lines.forEach((line, index) => {
        if (line.includes(`SNIPPET ${props.snippet_name} START`)) {
          start = index+1;
        }
        if (line.includes(`SNIPPET ${props.snippet_name} END`)) {
          end = index;
        }
      });
      // If the snippet markers cant be matched in the file, just show the whole file
      if(start===0 && end===0) {
        setCode(lines.join('\n'));
        setLink(basicURL);
        
      } else{
        setCode(lines.slice(start,end).join('\n'));
        setLink(basicURL+`#L${start}-L${end+1}`);
      }
      
    };
    fetchData();
  });

  return (
    <CB showLineNumbers={false} title={<a href={link}>{link}</a>} language={"python"}>{code}</CB>
  );
}
