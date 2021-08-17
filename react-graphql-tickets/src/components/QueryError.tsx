export const QueryError = ({ error }: { error: any }) => {
  return (
    <pre>
      <code>ERROR: {JSON.stringify(error, null, "  ")}</code>
    </pre>
  );
};
