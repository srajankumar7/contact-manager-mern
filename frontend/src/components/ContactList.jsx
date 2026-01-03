export default function ContactList({ contacts, onDelete }) {
  if (!contacts || contacts.length === 0) return null;

  return (
    <table
      style={{
        width: "100%",
        marginTop: "20px",
        borderCollapse: "collapse"
      }}
    >
      <thead>
        <tr style={{ backgroundColor: "#f2f2f2" }}>
          <th style={th}>Name</th>
          <th style={th}>Gmail</th>
          <th style={th}>Phone</th>
          <th style={th}>Message</th>
          <th style={th}>Action</th>
        </tr>
      </thead>

      <tbody>
        {contacts.map(c => (
          <tr key={c._id}>
            <td style={td}>{c.name}</td>
            <td style={td}>{c.email}</td>
            <td style={td}>{c.phone}</td>
            <td style={td}>{c.message || "-"}</td>
            <td style={td}>
              <button
                onClick={() => onDelete(c._id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const th = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "left"
};

const td = {
  border: "1px solid #ddd",
  padding: "10px",
  verticalAlign: "top"
};
