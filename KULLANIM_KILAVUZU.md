/* Mobil ve Responsive İyileştirmeler */

@media (max-width: 768px) {
  /* Dashboard sidebar mobilde küçült */
  .dashboard-sidebar {
    width: 100%;
    max-width: 280px;
  }

  /* Login paneli mobilde tam genişlik */
  .login-panel {
    max-width: 90vw;
    padding: 1.5rem;
  }

  /* Tablo mobilde yatay scroll */
  .table-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  /* Font boyutları mobilde küçült */
  h1 {
    font-size: 1.75rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  /* Butonlar mobilde tam genişlik */
  .mobile-full-width {
    width: 100%;
  }

  /* Grid kolonları mobilde tek sütun */
  .responsive-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  /* Logo boyutları mobilde küçült */
  .logo-container {
    max-height: 100px;
  }

  /* Menü öğeleri mobilde padding azalt */
  .menu-item {
    padding: 0.75rem;
  }

  /* Modal mobilde tam ekran */
  .modal-content {
    max-width: 95vw;
    max-height: 95vh;
  }
}

/* Touch cihazlar için hover efektlerini devre dışı bırak */
@media (hover: none) and (pointer: coarse) {
  .hover-effect:hover {
    transform: none;
    scale: 1;
  }
}

/* Landscape mod uyarısı */
@media (max-height: 500px) and (orientation: landscape) {
  .landscape-warning {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #f59e0b;
    color: white;
    padding: 0.5rem;
    text-align: center;
    z-index: 9999;
    font-size: 0.875rem;
  }
}

/* Print stilleri - PDF için */
@media print {
  .no-print {
    display: none !important;
  }

  .print-full-width {
    width: 100%;
  }

  body {
    background: white;
  }
}
