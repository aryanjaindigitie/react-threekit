import React, { useState } from 'react';
import { Input, Button } from 'antd';

export const Credentials = (props) => {
  const [orgId, setOrgId] = useState(props.creds?.orgId || '');
  const [authToken, setAuthToken] = useState(props.creds?.authToken || '');
  const [threekitEnv, setThreekitEnv] = useState(
    props.creds?.threekitEnv || 'preview.threekit.com'
  );
  const { onContinue } = props;

  const handleClick = () => onContinue({ orgId, authToken, threekitEnv });

  return (
    <div style={{ margin: '12px', width: '320px' }}>
      Threekit Environment:
      <Input
        value={threekitEnv}
        onChange={(e) => setThreekitEnv(e.target.value)}
      />
      Auth Token:
      <Input value={authToken} onChange={(e) => setAuthToken(e.target.value)} />
      OrgId:
      <Input value={orgId} onChange={(e) => setOrgId(e.target.value)} />
      <Button
        style={{ marginTop: '12px' }}
        disabled={!orgId.length || !authToken.length || !threekitEnv.length}
        onClick={handleClick}
      >
        Continue
      </Button>
    </div>
  );
};

export default Credentials;
