<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress');

/** MySQL database username */
define('DB_USER', 'wordpressuser');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');
define( 'WP_ALLOW_MULTISITE', true );
define( 'CUSTOM_TAGS', true );
define('CONCATENATE_SCRIPTS', false);


/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '>,S8T[8t::w3C9uufU@n}qzFHa?oyN1s;r$>6Cwh F,ax|F:|XS@x4T#WV j<RH2');
define('SECURE_AUTH_KEY',  '(7(S}g(!Vx:D#W?t,|ficB_FkM7/aE_AdKK-{,+]EAc[th<0HU=w^?R3N(]STlAh');
define('LOGGED_IN_KEY',    'KF1/W0s~-IM?~9?j1qZ>vG.yx!z7Q8l3Mgu+UwCkAO80o&nT,(q6X.u:O&wXu.Xt');
define('NONCE_KEY',        '!(V&=Nbt{(6oA`A|;zJjU:4S_(Rl,v//m1B_1{6*yi6;^7yf2[D^<E^)U~_fv} H');
define('AUTH_SALT',        'y_r,:qYGSzUZAw[)sRf%/..,Jt?+%Z+7set.hq?ms[}FRA%g[stcpPbHjXxy32]#');
define('SECURE_AUTH_SALT', ';SCe# FZ:U5>gvsn_0(G$I%9q.ck<LSXNhl*BuMZ>Eg;n v+}w(Sy=,NmOA5]f=T');
define('LOGGED_IN_SALT',   't!hE[.VsbDJ~d$%+|h5F<;%TFX%ma(Z4t%QyF4# AuNYZ5!p:Z=$:v0Rxu&,AvpE');
define('NONCE_SALT',       'pWXTVrQM7,h#cE( 2T=k?[h.F$zh~EOn4B5kd-Maf0z#^9]<!rppjewmL&G^y4YM');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);
define('MULTISITE', true);
define('SUBDOMAIN_INSTALL', true);
define('DOMAIN_CURRENT_SITE', 'localhost.com');
define('PATH_CURRENT_SITE', '/');
define('SITE_ID_CURRENT_SITE', 1);
define('BLOG_ID_CURRENT_SITE', 1);
/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

