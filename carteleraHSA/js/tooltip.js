/* Código para Iniciarlizar los Tooltips en todo el sitio web */
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl)
	{
		return new bootstrap.Tooltip(tooltipTriggerEl)
	})