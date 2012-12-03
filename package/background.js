
    // vars

    var DEBUG         = 'umbDebug=true',
        DEBUGTRACE    = 'umbDebugShowTrace=true',

        a_normal      = document.getElementById('normal'),
        a_debug       = document.getElementById('debug'),
        a_debug_trace = document.getElementById('debug_trace'),
        a_umbraco     = document.getElementById('umbraco'),
        
        debug         = document.getElementById('debug'),
        
        s_custom      = document.getElementById('s_custom'),
        s_our         = document.getElementById('s_our'); 

    // events
	
    a_debug.onclick = function(e) {
		e.preventDefault();
        chrome.tabs.getSelected(null, function(tab) {
			var code = e.which;
			if(code === 2) {
				chrome.tabs.create({ url: reset_url(tab.url, true) + DEBUG });	
			}
			else if (code === 1) {
				chrome.tabs.update(tab.id, { url: reset_url(tab.url, true) + DEBUG });
			}
            window.close();
            reset_menu();
        });
    };

    a_debug_trace.onclick = function(e) {
		e.preventDefault();
        chrome.tabs.getSelected(null, function(tab) {
			var code = e.which;
			if(code === 2) {
				chrome.tabs.create({ url: reset_url(tab.url, true) + DEBUGTRACE });	
			}
			else if (code === 1) {
				 chrome.tabs.update(tab.id, { url: reset_url(tab.url, true) + DEBUGTRACE });
			}
           
            window.close();
            //reset_menu();
        });
    };

    a_normal.onclick = function(e) {
		e.preventDefault();
        chrome.tabs.getSelected(null, function(tab) {
			var code = e.which;
			if(code === 2) {
				chrome.tabs.create({ url: reset_url(tab.url, false) });
			}
			else if (code === 1) {
				chrome.tabs.update(tab.id, { url: reset_url(tab.url, false) });
			}
           
            window.close();
            //reset_menu();
        });
    };
	a_umbraco.onclick = function(e) {
		e.preventDefault();
        chrome.tabs.getSelected(null, function(tab) {

            url = tab.url;

            ix_protocol = url.indexOf('://');
            ix_host = url.indexOf('/', ix_protocol + '://'.length);

            url = ix_host == -1
                ? url + '/umbraco/umbraco.aspx'
                : url.substring(0, ix_host) + '/umbraco/umbraco.aspx';
			var code = e.which;
			if(code === 2) {
				chrome.tabs.create({ url: url });	
			}
			else if (code === 1) {
				chrome.tabs.update(tab.id, { url: url });
			}
		   
            window.close();
            //reset_menu();
        });
    };
    // our search

    s_our.onclick = function() {
        s_our.select();
        s_our.style.color = '#000';
    };

    s_our.onkeydown = function(e) {
        if (e.keyCode == 13) {
            chrome.tabs.create({ url: 'http://our.umbraco.org/search?content=wiki,forum,project,&q=' + s_our.value });
        }
    };

    // custom search

    s_custom.onclick = function() {
        s_custom.select();
        s_custom.style.color = '#000';
    };

    s_custom.onkeydown = function(e) {
        if (e.keyCode == 13) {
            chrome.tabs.create({ url: 'http://www.google.com/cse?cx=006828407427845235189:u1fygyy_s54&q=' + s_custom.value });
        }
    };
    
    // helpers

    function reset_menu() {

        a_umbraco.className     = '';
        a_debug.className       = '';
        a_debug_trace.className = '';
        a_normal.className      = '';

        chrome.tabs.getSelected(null, function(tab) {

            var url = tab.url;
            
            if      (url.indexOf('/umbraco') != -1) { a_umbraco.className     = 'current'; }
            else if (url.indexOf(DEBUG)      != -1) { a_debug.className       = 'current'; }
            else if (url.indexOf(DEBUGTRACE) != -1) { a_debug_trace.className = 'current'; }
            else                                    { a_normal.className      = 'current'; }
        });
    }    

    function reset_url(url, with_appender) {
        
        url = url.replace('?' + DEBUG, '').replace('?' + DEBUGTRACE, '')
                 .replace('&' + DEBUG, '').replace('&' + DEBUGTRACE, '')

        if (url.indexOf('/umbraco') != -1) {
            url = url.substring(0, url.indexOf('/umbraco'));
        }

        return url + (with_appender ? get_appender(url) : '');
    }

    function get_appender(url) {
        return (url.indexOf('?') != -1 ? '&' : '?');
    }

    reset_menu();