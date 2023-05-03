import * as React from 'react';
import styles from './ChatWithData.module.scss';
import { IChatWithDataProps } from './IChatWithDataProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { useState } from 'react';





export const ChatWithData: React.FC<IChatWithDataProps> = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setQuery(newValue || '');
  };

  const handleSubmit = async () => {
    if (query.trim() !== '') {
      try {
        const apiUrl = 'https://192.168.18.209:5000/query';
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ Query: query }),
        };
        const apiResponse = await fetch(apiUrl, requestOptions);
        const data = await apiResponse.json();
        setResponse(data.output);
      } catch (error) {
        setResponse('Error occurred while fetching data from API.');
      }
    }
  };

  return (
    <div className={styles.chatWithData}>
      <TextField
        label="Enter your query"
        value={query}
        onChange={handleChange}
        multiline
        rows={3}
        styles={{ root: { width: '100%' } }}
      />
 <PrimaryButton text="Submit" onClick={handleSubmit} className={styles.teams} />
      {response && (
  <div className={styles.welcome}>
  <div className={styles.welcomeImage}>API Response:</div>
  <div className={styles.links}>{response}</div>
</div>
      
      )}
    </div>
  );
};


