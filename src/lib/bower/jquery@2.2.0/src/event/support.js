/* */ 
"format global";
define( [
	"../var/support"
], function( support ) {

support.focusin = "onfocusin" in window;

return support;

} );
