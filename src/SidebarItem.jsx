

function SidebarItem({ label, active, onClick }) {
    return (
      <button
        className={`nav-item ${active ? 'active' : ''}`}
        onClick={onClick}
        aria-current={active ? 'page' : undefined}
      >
        <span className="nav-text">{label}</span>
      </button>
    )
  }

  export default SidebarItem;