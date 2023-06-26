export const userColumns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "displayName", headerName: "暱稱", width: 150},
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "sum",
    headerName: "市值",
    width: 230,
  },

  {
    field: "cash",
    headerName: "現金",
    width: 100,
  },
  {
    field: "progress",
    headerName: "",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
