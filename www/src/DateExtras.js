//@define Ext.DateExtras
/**
 * @class Ext.Date
 * @mixins Ext.DateExtras
 * A set of useful static methods to deal with date.
 *
 * __Note:__ Unless you require `Ext.DateExtras`, only the {@link #now} method will be available. You **MUST**
 * require `Ext.DateExtras` to use the other methods available below.
 *
 * Usage with {@link Ext#setup}:
 *
 *     @example
 *     Ext.setup({
 *         requires: 'Ext.DateExtras',
 *         onReady: function() {
 *             var date = new Date();
 *             alert(Ext.Date.format(date, 'n/j/Y'));
 *         }
 *     });
 *
 * The date parsing and formatting syntax contains a subset of
 * [PHP's `date()` function](https://www.php.net/date), and the formats that are
 * supported will provide results equivalent to their PHP versions.
 *
 * The following is a list of all currently supported formats:
 * <pre>
Format  Description                                                               Example returned values
------  -----------------------------------------------------------------------   -----------------------
  d     Day of the month, 2 digits with leading zeros                             01 to 31
  D     A short textual representation of the day of the week                     Mon to Sun
  j     Day of the month without leading zeros                                    1 to 31
  l     A full textual representation of the day of the week                      Sunday to Saturday
  N     ISO-8601 numeric representation of the day of the week                    1 (for Monday) through 7 (for Sunday)
  S     English ordinal suffix for the day of the month, 2 characters             st, nd, rd or th. Works well with j
  w     Numeric representation of the day of the week                             0 (for Sunday) to 6 (for Saturday)
  z     The day of the year (starting from 0)                                     0 to 364 (365 in leap years)
  W     ISO-8601 week number of year, weeks starting on Monday                    01 to 53
  F     A full textual representation of a month, such as January or March        January to December
  m     Numeric representation of a month, with leading zeros                     01 to 12
  M     A short textual representation of a month                                 Jan to Dec
  n     Numeric representation of a month, without leading zeros                  1 to 12
  t     Number of days in the given month                                         28 to 31
  L     Whether it&#39;s a leap year                                                  1 if it is a leap year, 0 otherwise.
  o     ISO-8601 year number (identical to (Y), but if the ISO week number (W)    Examples: 1998 or 2004
        belongs to the previous or next year, that year is used instead)
  Y     A full numeric representation of a year, 4 digits                         Examples: 1999 or 2003
  y     A two digit representation of a year                                      Examples: 99 or 03
  a     Lowercase Ante meridiem and Post meridiem                                 am or pm
  A     Uppercase Ante meridiem and Post meridiem                                 AM or PM
  g     12-hour format of an hour without leading zeros                           1 to 12
  G     24-hour format of an hour without leading zeros                           0 to 23
  h     12-hour format of an hour with leading zeros                              01 to 12
  H     24-hour format of an hour with leading zeros                              00 to 23
  i     Minutes, with leading zeros                                               00 to 59
  s     Seconds, with leading zeros                                               00 to 59
  u     Decimal fraction of a second                                              Examples:
        (minimum 1 digit, arbitrary number of digits allowed)                     001 (i.e. 0.001s) or
                                                                                  100 (i.e. 0.100s) or
                                                                                  999 (i.e. 0.999s) or
                                                                                  999876543210 (i.e. 0.999876543210s)
  O     Difference to Greenwich time (GMT) in hours and minutes                   Example: +1030
  P     Difference to Greenwich time (GMT) with colon between hours and minutes   Example: -08:00
  T     Timezone abbreviation of the machine running the code                     Examples: EST, MDT, PDT ...
  Z     Timezone offset in seconds (negative if west of UTC, positive if east)    -43200 to 50400
  c     ISO 8601 date
        Notes:                                                                    Examples:
        1) If unspecified, the month / day defaults to the current month / day,   1991 or
           the time defaults to midnight, while the timezone defaults to the      1992-10 or
           browser's timezone. If a time is specified, it must include both hours 1993-09-20 or
           and minutes. The "T" delimiter, seconds, milliseconds and timezone     1994-08-19T16:20+01:00 or
           are optional.                                                          1995-07-18T17:21:28-02:00 or
        2) The decimal fraction of a second, if specified, must contain at        1996-06-17T18:22:29.98765+03:00 or
           least 1 digit (there is no limit to the maximum number                 1997-05-16T19:23:30,12345-0400 or
           of digits allowed), and may be delimited by either a '.' or a ','      1998-04-15T20:24:31.2468Z or
        Refer to the examples on the right for the various levels of              1999-03-14T20:24:32Z or
        date-time granularity which are supported, or see                         2000-02-13T21:25:33
        https://www.w3.org/TR/NOTE-datetime for more info.                         2001-01-12 22:26:34
  U     Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)                1193432466 or -2138434463
  MS    Microsoft AJAX serialized dates                                           \/Date(1238606590509)\/ (i.e. UTC milliseconds since epoch) or
                                                                                  \/Date(1238606590509+0800)\/
</pre>
 *
 * For more information on the ISO 8601 date/time format, see [https://www.w3.org/TR/NOTE-datetime](https://www.w3.org/TR/NOTE-datetime).
 *
 * Example usage (note that you must escape format specifiers with '\\' to render them as character literals):
 *
 *     // Sample date:
 *     // 'Wed Jan 10 2007 15:05:01 GMT-0600 (Central Standard Time)'
 *
 *     var dt = new Date('1/10/2007 03:05:01 PM GMT-0600');
 *     console.log(Ext.Date.format(dt, 'Y-m-d'));                          // 2007-01-10
 *     console.log(Ext.Date.format(dt, 'F j, Y, g:i a'));                  // January 10, 2007, 3:05 pm
 *     console.log(Ext.Date.format(dt, 'l, \\t\\he jS \\of F Y h:i:s A')); // Wednesday, the 10th of January 2007 03:05:01 PM
 *
 * Here are some standard date/time patterns that you might find helpful.  They
 * are not part of the source of Ext.Date, but to use them you can simply copy this
 * block of code into any script that is included after Ext.Date and they will also become
 * globally available on the Date object.  Feel free to add or remove patterns as needed in your code.
 *
 *     Ext.Date.patterns = {
 *         ISO8601Long: "Y-m-d H:i:s",
 *         ISO8601Short: "Y-m-d",
 *         ShortDate: "n/j/Y",
 *         LongDate: "l, F d, Y",
 *         FullDateTime: "l, F d, Y g:i:s A",
 *         MonthDay: "F d",
 *         ShortTime: "g:i A",
 *         LongTime: "g:i:s A",
 *         SortableDateTime: "Y-m-d\\TH:i:s",
 *         UniversalSortableDateTime: "Y-m-d H:i:sO",
 *         YearMonth: "F, Y"
 *     };
 *
 * Example usage:
 *
 *     @example
 *     var dt = new Date();
 *     Ext.Date.patterns = {
 *         ShortDate: "n/j/Y"
 *     };
 *     alert(Ext.Date.format(dt, Ext.Date.patterns.ShortDate));
 *
 * Developer-written, custom formats may be used by supplying both a formatting and a parsing function
 * which perform to specialized requirements. The functions are stored in {@link #parseFunctions} and {@link #formatFunctions}.
 * @singleton
 */

/*
 * Most of the date-formatting functions below are the excellent work of Baron Schwartz.
 * see https://www.xaprb.com/blog/2005/12/12/javascript-closures-for-runtime-efficiency/)
 * They generate precompiled functions from format patterns instead of parsing and
 * processing each pattern every time a date is formatted. These functions are available
 * on every Date object.
 */

(function() {

// create private copy of Ext's Ext.util.Format.format() method
// - to remove unnecessary dependency
// - to resolve namespace conflict with MS-Ajax's implementation
function xf(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/\{(\d+)\}/g, function(m, i) {
        return args[i];
    });
}

/**
 * Extra methods to be mixed into Ext.Date.
 *
 * Require this class to get Ext.Date with all the methods listed below.
 *
 * Using Ext.setup:
 *
 *     @example
 *     Ext.setup({
 *         requires: 'Ext.DateExtras',
 *         onReady: function() {
 *             var date = new Date();
 *             alert(Ext.Date.format(date, 'n/j/Y'));
 *         }
 *     });
 *
 * Using Ext.application:
 *
 *     @example
 *     Ext.application({
 *         requires: 'Ext.DateExtras',
 *         launch: function() {
 *             var date = new Date();
 *             alert(Ext.Date.format(date, 'n/j/Y'));
 *         }
 *     });
 *
 * @singleton
 */
Ext.DateExtras = {
    /**
     * Returns the current timestamp.
     * @return {Number} The current timestamp.
     * @method
     */
    now: Date.now || function() {
        return +new Date();
    },

    /**
     * Returns the number of milliseconds between two dates.
     * @param {Date} dateA The first date.
     * @param {Date} [dateB=new Date()] (optional) The second date, defaults to now.
     * @return {Number} The difference in milliseconds.
     */
    getElapsed: function(dateA, dateB) {
        return Math.abs(dateA - (dateB || new Date()));
    },

    /**
     * Global flag which determines if strict date parsing should be used.
     * Strict date parsing will not roll-over invalid dates, which is the
     * default behavior of JavaScript Date objects.
     * (see {@link #parse} for more information)
     * @type Boolean
    */
    useStrict: false,

    // @private
    formatCodeToRegex: function(character, currentGroup) {
        // Note: currentGroup - position in regex result array (see notes for Ext.Date.parseCodes below)
        var p = utilDate.parseCodes[character];

        if (p) {
          p = typeof p == 'function'? p() : p;
          utilDate.parseCodes[character] = p; // reassign function result to prevent repeated execution
        }

        return p ? Ext.applyIf({
          c: p.c ? xf(p.c, currentGroup || "{0}") : p.c
        }, p) : {
            g: 0,
            c: null,
            s: Ext.String.escapeRegex(character) // treat unrecognized characters as literals
        };
    },

    /**
     * An object hash in which each property is a date parsing function. The property name is the
     * format string which that function parses.
     *
     * This object is automatically populated with date parsing functions as
     * date formats are requested for Ext standard formatting strings.
     *
     * Custom parsing functions may be inserted into this object, keyed by a name which from then on
     * may be used as a format string to {@link #parse}.
     *
     * Example:
     *
     *     Ext.Date.parseFunctions['x-date-format'] = myDateParser;
     *
     * A parsing function should return a Date object, and is passed the following parameters:
     *
     * - `date`: {@link String} - The date string to parse.
     * - `strict`: {@link Boolean} - `true` to validate date strings while parsing
     * (i.e. prevent JavaScript Date "rollover"). __The default must be `false`.__
     * Invalid date strings should return `null` when parsed.
     *
     * To enable Dates to also be _formatted_ according to that format, a corresponding
     * formatting function must be placed into the {@link #formatFunctions} property.
     * @property parseFunctions
     * @type Object
     */
    parseFunctions: {
        "MS": function(input, strict) {
            // note: the timezone offset is ignored since the MS Ajax server sends
            // a UTC milliseconds-since-Unix-epoch value (negative values are allowed)
            var re = new RegExp('\\\\?/Date\\(([-+])?(\\d+)(?:[+-]\\d{4})?\\)\\\\?/');
            var r = (input || '').match(re);
            return r? new Date(((r[1] || '') + r[2]) * 1) : null;
        }
    },
    parseRegexes: [],

    /**
     * An object hash in which each property is a date formatting function. The property name is the
     * format string which corresponds to the produced formatted date string.
     *
     * This object is automatically populated with date formatting functions as
     * date formats are requested for Ext standard formatting strings.
     *
     * Custom formatting functions may be inserted into this object, keyed by a name which from then on
     * may be used as a format string to {@link #format}.
     *
     * Example:
     *
     *     Ext.Date.formatFunctions['x-date-format'] = myDateFormatter;
     *
     * A formatting function should return a string representation of the Date object which is the scope (this) of the function.
     *
     * To enable date strings to also be _parsed_ according to that format, a corresponding
     * parsing function must be placed into the {@link #parseFunctions} property.
     * @property formatFunctions
     * @type Object
     */
    formatFunctions: {
        "MS": function() {
            // UTC milliseconds since Unix epoch (MS-AJAX serialized date format (MRSF))
            return '\\/Date(' + this.getTime() + ')\\/';
        }
    },

    y2kYear : 50,

    /**
     * Date interval constant.
     * @type String
     * @readonly
     */
    MILLI : "ms",

    /**
     * Date interval constant.
     * @type String
     * @readonly
     */
    SECOND : "s",

    /**
     * Date interval constant.
     * @type String
     * @readonly
     */
    MINUTE : "mi",

    /**
     * Date interval constant.
     * @type String
     * @readonly
     */
    HOUR : "h",

    /**
     * Date interval constant.
     * @type String
     * @readonly
     */
    DAY : "d",

    /**
     * Date interval constant.
     * @type String
     * @readonly
     */
    MONTH : "mo",

    /**
     * Date interval constant.
     * @type String
     * @readonly
     */
    YEAR : "y",

    /**
     * An object hash containing default date values used during date parsing.
     * 
     * The following properties are available:
     * 
     * - `y`: {@link Number} - The default year value. Defaults to `undefined`.
     * - `m`: {@link Number} - The default 1-based month value. Defaults to `undefined`.
     * - `d`: {@link Number} - The default day value. Defaults to `undefined`.
     * - `h`: {@link Number} - The default hour value. Defaults to `undefined`.
     * - `i`: {@link Number} - The default minute value. Defaults to `undefined`.
     * - `s`: {@link Number} - The default second value. Defaults to `undefined`.
     * - `ms`: {@link Number} - The default millisecond value. Defaults to `undefined`.
     *
     * Override these properties to customize the default date values used by the {@link #parse} method.
     *
     * __Note:__ In countries which experience Daylight Saving Time (i.e. DST), the `h`, `i`, `s`
     * and `ms` properties may coincide with the exact time in which DST takes effect.
     * It is the responsibility of the developer to account for this.
     *
     * Example Usage:
     * 
     *     @example
     *     // set default day value to the first day of the month
     *     Ext.Date.defaults.d = 1;
     *
     *     // parse a February date string containing only year and month values.
     *     // setting the default day value to 1 prevents weird date rollover issues.
     *     // when attempting to parse the following date string on, for example, March 31st 2009.
     *     alert(Ext.Date.parse('2009-02', 'Y-m')); // returns a Date object representing February 1st 2009.
     *
     * @property defaults
     * @type Object
     */
    defaults: {},

    /**
     * An array of textual day names.
     * Override these values for international dates.
     * Example:
     *
     *     Ext.Date.dayNames = [
     *         'SundayInYourLang',
     *         'MondayInYourLang'
     *         // ...
     *     ];
     *
     * @type Array
     */
    dayNames : [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ],

    /**
     * An array of textual month names.
     * Override these values for international dates.
     * Example:
     *
     *     Ext.Date.monthNames = [
     *         'JanInYourLang',
     *         'FebInYourLang'
     *         // ...
     *     ];
     *
     * @type Array
     */
    monthNames : [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ],

    /**
     * An object hash of zero-based JavaScript month numbers (with short month names as keys).
     *
     * __Note:__ keys are case-sensitive.
     *
     * Override these values for international dates.
     * Example:
     *
     *     Ext.Date.monthNumbers = {
     *         'ShortJanNameInYourLang': 0,
     *         'ShortFebNameInYourLang': 1
     *         // ...
     *     };
     *
     * @type Object
     */
    monthNumbers : {
        Jan:0,
        Feb:1,
        Mar:2,
        Apr:3,
        May:4,
        Jun:5,
        Jul:6,
        Aug:7,
        Sep:8,
        Oct:9,
        Nov:10,
        Dec:11
    },
    /**
     * The date format string that the {@link Ext.util.Format#date} function uses.
     * See {@link Ext.Date} for details.
     *
     * This defaults to `m/d/Y`, but may be overridden in a locale file.
     * @property defaultFormat
     * @type String
     */
    defaultFormat : "m/d/Y",
    /**
     * Get the short month name for the given month number.
     * Override this function for international dates.
     * @param {Number} month A zero-based JavaScript month number.
     * @return {String} The short month name.
     */
    getShortMonthName : function(month) {
        return utilDate.monthNames[month].substring(0, 3);
    },

    /**
     * Get the short day name for the given day number.
     * Override this function for international dates.
     * @param {Number} day A zero-based JavaScript day number.
     * @return {String} The short day name.
     */
    getShortDayName : function(day) {
        return utilDate.dayNames[day].substring(0, 3);
    },

    /**
     * Get the zero-based JavaScript month number for the given short/full month name.
     * Override this function for international dates.
     * @param {String} name The short/full month name.
     * @return {Number} The zero-based JavaScript month number.
     */
    getMonthNumber : function(name) {
        // handle camel casing for English month names (since the keys for the Ext.Date.monthNumbers hash are case sensitive)
        return utilDate.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
    },

    /**
     * The base format-code to formatting-function hashmap used by the {@link #format} method.
     * Formatting functions are strings (or functions which return strings) which
     * will return the appropriate value when evaluated in the context of the Date object
     * from which the {@link #format} method is called.
     * Add to / override these mappings for custom date formatting.
     *
     * __Note:__ `Ext.Date.format()` treats characters as literals if an appropriate mapping cannot be found.
     *
     * Example:
     *
     *     @example
     *     Ext.Date.formatCodes.x = "Ext.util.Format.leftPad(this.getDate(), 2, '0')";
     *     alert(Ext.Date.format(new Date(), 'x')); // returns the current day of the month
     *
     * @type Object
     */
    formatCodes : {
        d: "Ext.String.leftPad(this.getDate(), 2, '0')",
        D: "Ext.Date.getShortDayName(this.getDay())", // get localized short day name
        j: "this.getDate()",
        l: "Ext.Date.dayNames[this.getDay()]",
        N: "(this.getDay() ? this.getDay() : 7)",
        S: "Ext.Date.getSuffix(this)",
        w: "this.getDay()",
        z: "Ext.Date.getDayOfYear(this)",
        W: "Ext.String.leftPad(Ext.Date.getWeekOfYear(this), 2, '0')",
        F: "Ext.Date.monthNames[this.getMonth()]",
        m: "Ext.String.leftPad(this.getMonth() + 1, 2, '0')",
        M: "Ext.Date.getShortMonthName(this.getMonth())", // get localized short month name
        n: "(this.getMonth() + 1)",
        t: "Ext.Date.getDaysInMonth(this)",
        L: "(Ext.Date.isLeapYear(this) ? 1 : 0)",
        o: "(this.getFullYear() + (Ext.Date.getWeekOfYear(this) == 1 && this.getMonth() > 0 ? +1 : (Ext.Date.getWeekOfYear(this) >= 52 && this.getMonth() < 11 ? -1 : 0)))",
        Y: "Ext.String.leftPad(this.getFullYear(), 4, '0')",
        y: "('' + this.getFullYear()).substring(2, 4)",
        a: "(this.getHours() < 12 ? 'am' : 'pm')",
        A: "(this.getHours() < 12 ? 'AM' : 'PM')",
        g: "((this.getHours() % 12) ? this.getHours() % 12 : 12)",
        G: "this.getHours()",
        h: "Ext.String.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0')",
        H: "Ext.String.leftPad(this.getHours(), 2, '0')",
        i: "Ext.String.leftPad(this.getMinutes(), 2, '0')",
        s: "Ext.String.leftPad(this.getSeconds(), 2, '0')",
        u: "Ext.String.leftPad(this.getMilliseconds(), 3, '0')",
        O: "Ext.Date.getGMTOffset(this)",
        P: "Ext.Date.getGMTOffset(this, true)",
        T: "Ext.Date.getTimezone(this)",
        Z: "(this.getTimezoneOffset() * -60)",

        c: function() { // ISO-8601 -- GMT format
            for (var c = "Y-m-dTH:i:sP", code = [], i = 0, l = c.length; i < l; ++i) {
                var e = c.charAt(i);
                code.push(e == "T" ? "'T'" : utilDate.getFormatCode(e)); // treat T as a character literal
            }
            return code.join(" + ");
        },
        /*
        c: function() { // ISO-8601 -- UTC format
            return [
              "this.getUTCFullYear()", "'-'",
              "Ext.util.Format.leftPad(this.getUTCMonth() + 1, 2, '0')", "'-'",
              "Ext.util.Format.leftPad(this.getUTCDate(), 2, '0')",
              "'T'",
              "Ext.util.Format.leftPad(this.getUTCHours(), 2, '0')", "':'",
              "Ext.util.Format.leftPad(this.getUTCMinutes(), 2, '0')", "':'",
              "Ext.util.Format.leftPad(this.getUTCSeconds(), 2, '0')",
              "'Z'"
            ].join(" + ");
        },
        */

        U: "Math.round(this.getTime() / 1000)"
    },

    /**
     * Checks if the passed Date parameters will cause a JavaScript Date "rollover".
     * @param {Number} year 4-digit year.
     * @param {Number} month 1-based month-of-year.
     * @param {Number} day Day of month.
     * @param {Number} hour (optional) Hour.
     * @param {Number} minute (optional) Minute.
     * @param {Number} second (optional) Second.
     * @param {Number} millisecond (optional) Millisecond.
     * @return {Boolean} `true` if the passed parameters do not cause a Date "rollover", `false` otherwise.
     */
    isValid : function(y, m, d, h, i, s, ms) {
        // setup defaults
        h = h || 0;
        i = i || 0;
        s = s || 0;
        ms = ms || 0;

        // Special handling for year < 100
        var dt = utilDate.add(new Date(y < 100 ? 100 : y, m - 1, d, h, i, s, ms), utilDate.YEAR, y < 100 ? y - 100 : 0);

        return y == dt.getFullYear() &&
            m == dt.getMonth() + 1 &&
            d == dt.getDate() &&
            h == dt.getHours() &&
            i == dt.getMinutes() &&
            s == dt.getSeconds() &&
            ms == dt.getMilliseconds();
    },

    /**
     * Parses the passed string using the specified date format.
     * Note that this function expects normal calendar dates, meaning that months are 1-based (i.e. 1 = January).
     * The {@link #defaults} hash will be used for any date value (i.e. year, month, day, hour, minute, second or millisecond)
     * which cannot be found in the passed string. If a corresponding default date value has not been specified in the {@link #defaults} hash,
     * the current date's year, month, day or DST-adjusted zero-hour time value will be used instead.
     * Keep in mind that the input date string must precisely match the specified format string
     * in order for the parse operation to be successful (failed parse operations return a `null` value).
     * 
     * Example:
     *
     *     // dt = Fri May 25 2007 (current date)
     *     var dt = new Date();
     *
     *     // dt = Thu May 25 2006 (today's month/day in 2006)
     *     dt = Ext.Date.parse("2006", "Y");
     *
     *     // dt = Sun Jan 15 2006 (all date parts specified)
     *     dt = Ext.Date.parse("2006-01-15", "Y-m-d");
     *
     *     // dt = Sun Jan 15 2006 15:20:01
     *     dt = Ext.Date.parse("2006-01-15 3:20:01 PM", "Y-m-d g:i:s A");
     *
     *     // attempt to parse Sun Feb 29 2006 03:20:01 in strict mode
     *     dt = Ext.Date.parse("2006-02-29 03:20:01", "Y-m-d H:i:s", true); // null
     *
     * @param {String} input The raw date string.
     * @param {String} format The expected date string format.
     * @param {Boolean} [strict=false] (optional) `true` to validate date strings while parsing (i.e. prevents JavaScript Date "rollover").
     * Invalid date strings will return `null` when parsed.
     * @return {Date/null} The parsed Date, or `null` if an invalid date string.
     */
    parse : function(input, format, strict) {
        var p = utilDate.parseFunctions;
        if (p[format] == null) {
            utilDate.createParser(format);
        }
        return p[format](input, Ext.isDefined(strict) ? strict : utilDate.useStrict);
    },

    // Backwards compat
    parseDate: function(input, format, strict){
        return utilDate.parse(input, format, strict);
    },


    // @private
    getFormatCode : function(character) {
        var f = utilDate.formatCodes[character];

        if (f) {
          f = typeof f == 'function'? f() : f;
          utilDate.formatCodes[character] = f; // reassign function result to prevent repeated execution
        }

        // note: unknown characters are treated as literals
        return f || ("'" + Ext.String.escape(character) + "'");
    },

    // @private
    createFormat : function(format) {
        var code = [],
            special = false,
            ch = '';

        for (var i = 0; i < format.length; ++i) {
            ch = format.charAt(i);
            if (!special && ch == "\\") {
                special = true;
            } else if (special) {
                special = false;
                code.push("'" + Ext.String.escape(ch) + "'");
            } else if (ch == '\n') {
                code.push(Ext.JSON.encode(ch));
            } else {
                code.push(utilDate.getFormatCode(ch));
            }
        }
        utilDate.formatFunctions[format] = Ext.functionFactory("return " + code.join('+'));
    },

    // @private
    createParser : (function() {
        var code = [
            "var dt, y, m, d, h, i, s, ms, o, z, zz, u, v,",
                "def = Ext.Date.defaults,",
                "results = String(input).match(Ext.Date.parseRegexes[{0}]);", // either null, or an array of matched strings

            "if(results){",
                "{1}",

                "if(u != null){", // i.e. unix time is defined
                    "v = new Date(u * 1000);", // give top priority to UNIX time
                "}else{",
                    // create Date object representing midnight of the current day;
                    // this will provide us with our date defaults
                    // (note: clearTime() handles Daylight Saving Time automatically)
                    "dt = Ext.Date.clearTime(new Date);",

                    // date calculations (note: these calculations create a dependency on Ext.Number.from())
                    "y = Ext.Number.from(y, Ext.Number.from(def.y, dt.getFullYear()));",
                    "m = Ext.Number.from(m, Ext.Number.from(def.m - 1, dt.getMonth()));",
                    "d = Ext.Number.from(d, Ext.Number.from(def.d, dt.getDate()));",

                    // time calculations (note: these calculations create a dependency on Ext.Number.from())
                    "h  = Ext.Number.from(h, Ext.Number.from(def.h, dt.getHours()));",
                    "i  = Ext.Number.from(i, Ext.Number.from(def.i, dt.getMinutes()));",
                    "s  = Ext.Number.from(s, Ext.Number.from(def.s, dt.getSeconds()));",
                    "ms = Ext.Number.from(ms, Ext.Number.from(def.ms, dt.getMilliseconds()));",

                    "if(z >= 0 && y >= 0){",
                        // both the year and zero-based day of year are defined and >= 0.
                        // these 2 values alone provide sufficient info to create a full date object

                        // create Date object representing January 1st for the given year
                        // handle years < 100 appropriately
                        "v = Ext.Date.add(new Date(y < 100 ? 100 : y, 0, 1, h, i, s, ms), Ext.Date.YEAR, y < 100 ? y - 100 : 0);",

                        // then add day of year, checking for Date "rollover" if necessary
                        "v = !strict? v : (strict === true && (z <= 364 || (Ext.Date.isLeapYear(v) && z <= 365))? Ext.Date.add(v, Ext.Date.DAY, z) : null);",
                    "}else if(strict === true && !Ext.Date.isValid(y, m + 1, d, h, i, s, ms)){", // check for Date "rollover"
                        "v = null;", // invalid date, so return null
                    "}else{",
                        // plain old Date object
                        // handle years < 100 properly
                        "v = Ext.Date.add(new Date(y < 100 ? 100 : y, m, d, h, i, s, ms), Ext.Date.YEAR, y < 100 ? y - 100 : 0);",
                    "}",
                "}",
            "}",

            "if(v){",
                // favor UTC offset over GMT offset
                "if(zz != null){",
                    // reset to UTC, then add offset
                    "v = Ext.Date.add(v, Ext.Date.SECOND, -v.getTimezoneOffset() * 60 - zz);",
                "}else if(o){",
                    // reset to GMT, then add offset
                    "v = Ext.Date.add(v, Ext.Date.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn));",
                "}",
            "}",

            "return v;"
        ].join('\n');

        return function(format) {
            var regexNum = utilDate.parseRegexes.length,
                currentGroup = 1,
                calc = [],
                regex = [],
                special = false,
                ch = "";

            for (var i = 0; i < format.length; ++i) {
                ch = format.charAt(i);
                if (!special && ch == "\\") {
                    special = true;
                } else if (special) {
                    special = false;
                    regex.push(Ext.String.escape(ch));
                } else {
                    var obj = utilDate.formatCodeToRegex(ch, currentGroup);
                    currentGroup += obj.g;
                    regex.push(obj.s);
                    if (obj.g && obj.c) {
                        calc.push(obj.c);
                    }
                }
            }

            utilDate.parseRegexes[regexNum] = new RegExp("^" + regex.join('') + "$", 'i');
            utilDate.parseFunctions[format] = Ext.functionFactory("input", "strict", xf(code, regexNum, calc.join('')));
        };
    })(),

    // @private
    parseCodes : {
        /*
         * Notes:
         * g = {Number} calculation group (0 or 1. only group 1 contributes to date calculations.)
         * c = {String} calculation method (required for group 1. null for group 0. {0} = currentGroup - position in regex result array)
         * s = {String} regex pattern. all matches are stored in results[], and are accessible by the calculation mapped to 'c'
         */
        d: {
            g:1,
            c:"d = parseInt(results[{0}], 10);\n",
            s:"(\\d{2})" // day of month with leading zeros (01 - 31)
        },
        j: {
            g:1,
            c:"d = parseInt(results[{0}], 10);\n",
            s:"(\\d{1,2})" // day of month without leading zeros (1 - 31)
        },
        D: function() {
            for (var a = [], i = 0; i < 7; a.push(utilDate.getShortDayName(i)), ++i); // get localized short day names
            return {
                g:0,
                c:null,
                s:"(?:" + a.join("|") +")"
            };
        },
        l: function() {
            return {
                g:0,
                c:null,
                s:"(?:" + utilDate.dayNames.join("|") + ")"
            };
        },
        N: {
            g:0,
            c:null,
            s:"[1-7]" // ISO-8601 day number (1 (monday) - 7 (sunday))
        },
        S: {
            g:0,
            c:null,
            s:"(?:st|nd|rd|th)"
        },
        w: {
            g:0,
            c:null,
            s:"[0-6]" // JavaScript day number (0 (sunday) - 6 (saturday))
        },
        z: {
            g:1,
            c:"z = parseInt(results[{0}], 10);\n",
            s:"(\\d{1,3})" // day of the year (0 - 364 (365 in leap years))
        },
        W: {
            g:0,
            c:null,
            s:"(?:\\d{2})" // ISO-8601 week number (with leading zero)
        },
        F: function() {
            return {
                g:1,
                c:"m = parseInt(Ext.Date.getMonthNumber(results[{0}]), 10);\n", // get localized month number
                s:"(" + utilDate.monthNames.join("|") + ")"
            };
        },
        M: function() {
            for (var a = [], i = 0; i < 12; a.push(utilDate.getShortMonthName(i)), ++i); // get localized short month names
            return Ext.applyIf({
                s:"(" + a.join("|") + ")"
            }, utilDate.formatCodeToRegex("F"));
        },
        m: {
            g:1,
            c:"m = parseInt(results[{0}], 10) - 1;\n",
            s:"(\\d{2})" // month number with leading zeros (01 - 12)
        },
        n: {
            g:1,
            c:"m = parseInt(results[{0}], 10) - 1;\n",
            s:"(\\d{1,2})" // month number without leading zeros (1 - 12)
        },
        t: {
            g:0,
            c:null,
            s:"(?:\\d{2})" // no. of days in the month (28 - 31)
        },
        L: {
            g:0,
            c:null,
            s:"(?:1|0)"
        },
        o: function() {
            return utilDate.formatCodeToRegex("Y");
        },
        Y: {
            g:1,
            c:"y = parseInt(results[{0}], 10);\n",
            s:"(\\d{4})" // 4-digit year
        },
        y: {
            g:1,
            c:"var ty = parseInt(results[{0}], 10);\n"
                + "y = ty > Ext.Date.y2kYear ? 1900 + ty : 2000 + ty;\n", // 2-digit year
            s:"(\\d{1,2})"
        },
        /*
         * In the am/pm parsing routines, we allow both upper and lower case
         * even though it doesn't exactly match the spec. It gives much more flexibility
         * in being able to specify case insensitive regexes.
         */
        a: {
            g:1,
            c:"if (/(am)/i.test(results[{0}])) {\n"
                + "if (!h || h == 12) { h = 0; }\n"
                + "} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
            s:"(am|pm|AM|PM)"
        },
        A: {
            g:1,
            c:"if (/(am)/i.test(results[{0}])) {\n"
                + "if (!h || h == 12) { h = 0; }\n"
                + "} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
            s:"(AM|PM|am|pm)"
        },
        g: function() {
            return utilDate.formatCodeToRegex("G");
        },
        G: {
            g:1,
            c:"h = parseInt(results[{0}], 10);\n",
            s:"(\\d{1,2})" // 24-hr format of an hour without leading zeros (0 - 23)
        },
        h: function() {
            return utilDate.formatCodeToRegex("H");
        },
        H: {
            g:1,
            c:"h = parseInt(results[{0}], 10);\n",
            s:"(\\d{2})" //  24-hr format of an hour with leading zeros (00 - 23)
        },
        i: {
            g:1,
            c:"i = parseInt(results[{0}], 10);\n",
            s:"(\\d{2})" // minutes with leading zeros (00 - 59)
        },
        s: {
            g:1,
            c:"s = parseInt(results[{0}], 10);\n",
            s:"(\\d{2})" // seconds with leading zeros (00 - 59)
        },
        u: {
            g:1,
            c:"ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n",
            s:"(\\d+)" // decimal fraction of a second (minimum = 1 digit, maximum = unlimited)
        },
        O: {
            g:1,
            c:[
                "o = results[{0}];",
                "var sn = o.substring(0,1),", // get + / - sign
                    "hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60),", // get hours (performs minutes-to-hour conversion also, just in case)
                    "mn = o.substring(3,5) % 60;", // get minutes
                "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.String.leftPad(hr, 2, '0') + Ext.String.leftPad(mn, 2, '0')) : null;\n" // -12hrs <= GMT offset <= 14hrs
            ].join("\n"),
            s: "([+\-]\\d{4})" // GMT offset in hrs and mins
        },
        P: {
            g:1,
            c:[
                "o = results[{0}];",
                "var sn = o.substring(0,1),", // get + / - sign
                    "hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60),", // get hours (performs minutes-to-hour conversion also, just in case)
                    "mn = o.substring(4,6) % 60;", // get minutes
                "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.String.leftPad(hr, 2, '0') + Ext.String.leftPad(mn, 2, '0')) : null;\n" // -12hrs <= GMT offset <= 14hrs
            ].join("\n"),
            s: "([+\-]\\d{2}:\\d{2})" // GMT offset in hrs and mins (with colon separator)
        },
        T: {
            g:0,
            c:null,
            s:"[A-Z]{1,4}" // timezone abbrev. may be between 1 - 4 chars
        },
        Z: {
            g:1,
            c:"zz = results[{0}] * 1;\n" // -43200 <= UTC offset <= 50400
                  + "zz = (-43200 <= zz && zz <= 50400)? zz : null;\n",
            s:"([+\-]?\\d{1,5})" // leading '+' sign is optional for UTC offset
        },
        c: function() {
            var calc = [],
                arr = [
                    utilDate.formatCodeToRegex("Y", 1), // year
                    utilDate.formatCodeToRegex("m", 2), // month
                    utilDate.formatCodeToRegex("d", 3), // day
                    utilDate.formatCodeToRegex("h", 4), // hour
                    utilDate.formatCodeToRegex("i", 5), // minute
                    utilDate.formatCodeToRegex("s", 6), // second
                    {c:"ms = results[7] || '0'; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n"}, // decimal fraction of a second (minimum = 1 digit, maximum = unlimited)
                    {c:[ // allow either "Z" (i.e. UTC) or "-0530" or "+08:00" (i.e. UTC offset) timezone delimiters. assumes local timezone if no timezone is specified
                        "if(results[8]) {", // timezone specified
                            "if(results[8] == 'Z'){",
                                "zz = 0;", // UTC
                            "}else if (results[8].indexOf(':') > -1){",
                                utilDate.formatCodeToRegex("P", 8).c, // timezone offset with colon separator
                            "}else{",
                                utilDate.formatCodeToRegex("O", 8).c, // timezone offset without colon separator
                            "}",
                        "}"
                    ].join('\n')}
                ];

            for (var i = 0, l = arr.length; i < l; ++i) {
                calc.push(arr[i].c);
            }

            return {
                g:1,
                c:calc.join(""),
                s:[
                    arr[0].s, // year (required)
                    "(?:", "-", arr[1].s, // month (optional)
                        "(?:", "-", arr[2].s, // day (optional)
                            "(?:",
                                "(?:T| )?", // time delimiter -- either a "T" or a single blank space
                                arr[3].s, ":", arr[4].s,  // hour AND minute, delimited by a single colon (optional). MUST be preceded by either a "T" or a single blank space
                                "(?::", arr[5].s, ")?", // seconds (optional)
                                "(?:(?:\\.|,)(\\d+))?", // decimal fraction of a second (e.g. ",12345" or ".98765") (optional)
                                "(Z|(?:[-+]\\d{2}(?::)?\\d{2}))?", // "Z" (UTC) or "-0530" (UTC offset without colon delimiter) or "+08:00" (UTC offset with colon delimiter) (optional)
                            ")?",
                        ")?",
                    ")?"
                ].join("")
            };
        },
        U: {
            g:1,
            c:"u = parseInt(results[{0}], 10);\n",
            s:"(-?\\d+)" // leading minus sign indicates seconds before UNIX epoch
        }
    },

    // Old Ext.Date prototype methods.
    // @private
    dateFormat: function(date, format) {
        return utilDate.format(date, format);
    },

    /**
     * Formats a date given the supplied format string.
     * @param {Date} date The date to format.
     * @param {String} format The format string.
     * @return {String} The formatted date.
     */
    format: function(date, format) {
        if (utilDate.formatFunctions[format] == null) {
            utilDate.createFormat(format);
        }
        var result = utilDate.formatFunctions[format].call(date);
        return result + '';
    },

    /**
     * Get the timezone abbreviation of the current date (equivalent to the format specifier 'T').
     *
     * __Note:__ The date string returned by the JavaScript Date object's `toString()` method varies
     * between browsers (e.g. FF vs IE) and system region settings (e.g. IE in Asia vs IE in America).
     * For a given date string e.g. "Thu Oct 25 2007 22:55:35 GMT+0800 (Malay Peninsula Standard Time)",
     * `getTimezone()` first tries to get the timezone abbreviation from between a pair of parentheses
     * (which may or may not be present), failing which it proceeds to get the timezone abbreviation
     * from the GMT offset portion of the date string.
     *
     *     @example
     *     var dt = new Date('9/17/2011');
     *     alert(Ext.Date.getTimezone(dt));
     *
     * @param {Date} date The date.
     * @return {String} The abbreviated timezone name (e.g. 'CST', 'PDT', 'EDT', 'MPST' ...).
     */
    getTimezone : function(date) {
        // the following list shows the differences between date strings from different browsers on a WinXP SP2 machine from an Asian locale:
        //
        // Opera  : "Thu, 25 Oct 2007 22:53:45 GMT+0800" -- shortest (weirdest) date string of the lot
        // Safari : "Thu Oct 25 2007 22:55:35 GMT+0800 (Malay Peninsula Standard Time)" -- value in parentheses always gives the correct timezone (same as FF)
        // FF     : "Thu Oct 25 2007 22:55:35 GMT+0800 (Malay Peninsula Standard Time)" -- value in parentheses always gives the correct timezone
        // IE     : "Thu Oct 25 22:54:35 UTC+0800 2007" -- (Asian system setting) look for 3-4 letter timezone abbrev
        // IE     : "Thu Oct 25 17:06:37 PDT 2007" -- (American system setting) look for 3-4 letter timezone abbrev
        //
        // this crazy regex attempts to guess the correct timezone abbreviation despite these differences.
        // step 1: (?:\((.*)\) -- find timezone in parentheses
        // step 2: ([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?) -- if nothing was found in step 1, find timezone from timezone offset portion of date string
        // step 3: remove all non uppercase characters found in step 1 and 2
        return date.toString().replace(/^.* (?:\((.*)\)|([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/, "$1$2").replace(/[^A-Z]/g, "");
    },

    /**
     * Get the offset from GMT of the current date (equivalent to the format specifier 'O').
     * 
     *     @example
     *     var dt = new Date('9/17/2011');
     *     alert(Ext.Date.getGMTOffset(dt));
     *
     * @param {Date} date The date.
     * @param {Boolean} [colon=false] (optional) `true` to separate the hours and minutes with a colon.
     * @return {String} The 4-character offset string prefixed with + or - (e.g. '-0600').
     */
    getGMTOffset : function(date, colon) {
        var offset = date.getTimezoneOffset();
        return (offset > 0 ? "-" : "+")
            + Ext.String.leftPad(Math.floor(Math.abs(offset) / 60), 2, "0")
            + (colon ? ":" : "")
            + Ext.String.leftPad(Math.abs(offset % 60), 2, "0");
    },

    /**
     * Get the numeric day number of the year, adjusted for leap year.
     *
     *     @example
     *     var dt = new Date('9/17/2011');
     *     alert(Ext.Date.getDayOfYear(dt)); // 259
     *
     * @param {Date} date The date.
     * @return {Number} 0 to 364 (365 in leap years).
     */
    getDayOfYear: function(date) {
        var num = 0,
            d = Ext.Date.clone(date),
            m = date.getMonth(),
            i;

        for (i = 0, d.setDate(1), d.setMonth(0); i < m; d.setMonth(++i)) {
            num += utilDate.getDaysInMonth(d);
        }
        return num + date.getDate() - 1;
    },

    /**
     * Get the numeric ISO-8601 week number of the year
     * (equivalent to the format specifier 'W', but without a leading zero).
     *
     *     @example
     *     var dt = new Date('9/17/2011');
     *     alert(Ext.Date.getWeekOfYear(dt)); // 37
     *
     * @param {Date} date The date.
     * @return {Number} 1 to 53.
     * @method
     */
    getWeekOfYear : (function() {
        // adapted from https://www.merlyn.demon.co.uk/weekcalc.htm
        var ms1d = 864e5, // milliseconds in a day
            ms7d = 7 * ms1d; // milliseconds in a week

        return function(date) { // return a closure so constants get calculated only once
            var DC3 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 3) / ms1d, // an Absolute Day Number
                AWN = Math.floor(DC3 / 7), // an Absolute Week Number
                Wyr = new Date(AWN * ms7d).getUTCFullYear();

            return AWN - Math.floor(Date.UTC(Wyr, 0, 7) / ms7d) + 1;
        };
    })(),

    /**
     * Checks if the current date falls within a leap year.
     *
     *     @example
     *     var dt = new Date('1/10/2011');
     *     alert(Ext.Date.isLeapYear(dt)); // false
     *
     * @param {Date} date The date.
     * @return {Boolean} `true` if the current date falls within a leap year, `false` otherwise.
     */
    isLeapYear : function(date) {
        var year = date.getFullYear();
        return !!((year & 3) == 0 && (year % 100 || (year % 400 == 0 && year)));
    },

    /**
     * Get the first day of the current month, adjusted for leap year.  The returned value
     * is the numeric day index within the week (0-6) which can be used in conjunction with
     * the {@link #monthNames} array to retrieve the textual day name.
     *
     *     @example
     *     var dt = new Date('1/10/2007'),
     *         firstDay = Ext.Date.getFirstDayOfMonth(dt);
     *     alert(Ext.Date.dayNames[firstDay]); // 'Monday'
     *
     * @param {Date} date The date
     * @return {Number} The day number (0-6).
     */
    getFirstDayOfMonth : function(date) {
        var day = (date.getDay() - (date.getDate() - 1)) % 7;
        return (day < 0) ? (day + 7) : day;
    },

    /**
     * Get the last day of the current month, adjusted for leap year.  The returned value
     * is the numeric day index within the week (0-6) which can be used in conjunction with
     * the {@link #monthNames} array to retrieve the textual day name.
     * 
     *     @example
     *     var dt = new Date('1/10/2007'),
     *         lastDay = Ext.Date.getLastDayOfMonth(dt);
     *     alert(Ext.Date.dayNames[lastDay]); // 'Wednesday'
     * 
     * @param {Date} date The date.
     * @return {Number} The day number (0-6).
     */
    getLastDayOfMonth : function(date) {
        return utilDate.getLastDateOfMonth(date).getDay();
    },


    /**
     * Get the date of the first day of the month in which this date resides.
     * 
     *     @example
     *     var dt = new Date('1/10/2007'),
     *         lastDate = Ext.Date.getFirstDateOfMonth(dt);
     *     alert(lastDate); // Mon Jan 01 2007 00:00:00 GMT-0800 (PST)
     * 
     * @param {Date} date The date.
     * @return {Date}
     */
    getFirstDateOfMonth : function(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    },

    /**
     * Get the date of the last day of the month in which this date resides.
     *
     *     @example
     *     var dt = new Date('1/10/2007'),
     *         lastDate = Ext.Date.getLastDateOfMonth(dt);
     *     alert(lastDate); // Wed Jan 31 2007 00:00:00 GMT-0800 (PST)
     *
     * @param {Date} date The date.
     * @return {Date}
     */
    getLastDateOfMonth : function(date) {
        return new Date(date.getFullYear(), date.getMonth(), utilDate.getDaysInMonth(date));
    },

    /**
     * Get the number of days in the current month, adjusted for leap year.
     *
     *     @example
     *     var dt = new Date('1/10/2007');
     *     alert(Ext.Date.getDaysInMonth(dt)); // 31
     *
     * @param {Date} date The date.
     * @return {Number} The number of days in the month.
     * @method
     */
    getDaysInMonth: (function() {
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        return function(date) { // return a closure for efficiency
            var m = date.getMonth();

            return m == 1 && utilDate.isLeapYear(date) ? 29 : daysInMonth[m];
        };
    })(),

    /**
     * Get the English ordinal suffix of the current day (equivalent to the format specifier 'S').
     *
     *     @example
     *     var dt = new Date('9/17/2011');
     *     alert(Ext.Date.getSuffix(dt)); // 'th'
     *
     * @param {Date} date The date.
     * @return {String} 'st', 'nd', 'rd' or 'th'.
     */
    getSuffix : function(date) {
        switch (date.getDate()) {
            case 1:
            case 21:
            case 31:
                return "st";
            case 2:
            case 22:
                return "nd";
            case 3:
            case 23:
                return "rd";
            default:
                return "th";
        }
    },

    /**
     * Creates and returns a new Date instance with the exact same date value as the called instance.
     * Dates are copied and passed by reference, so if a copied date variable is modified later, the original
     * variable will also be changed.  When the intention is to create a new variable that will not
     * modify the original instance, you should create a clone.
     *
     * Example of correctly cloning a date:
     *
     *     // wrong way:
     *     var orig = new Date('10/1/2006');
     *     var copy = orig;
     *     copy.setDate(5);
     *     console.log(orig);  // returns 'Thu Oct 05 2006'!
     *
     *     // correct way:
     *     var orig = new Date('10/1/2006'),
     *         copy = Ext.Date.clone(orig);
     *     copy.setDate(5);
     *     console.log(orig);  // returns 'Thu Oct 01 2006'
     *
     * @param {Date} date The date.
     * @return {Date} The new Date instance.
     */
    clone : function(date) {
        return new Date(date.getTime());
    },

    /**
     * Checks if the current date is affected by Daylight Saving Time (DST).
     *
     *     @example
     *     var dt = new Date('9/17/2011');
     *     alert(Ext.Date.isDST(dt));
     *
     * @param {Date} date The date.
     * @return {Boolean} `true` if the current date is affected by DST.
     */
    isDST : function(date) {
        // adapted from http://sencha.com/forum/showthread.php?p=247172#post247172
        // courtesy of @geoffrey.mcgill
        return new Date(date.getFullYear(), 0, 1).getTimezoneOffset() != date.getTimezoneOffset();
    },

    /**
     * Attempts to clear all time information from this Date by setting the time to midnight of the same day,
     * automatically adjusting for Daylight Saving Time (DST) where applicable.
     *
     * __Note:__ DST timezone information for the browser's host operating system is assumed to be up-to-date.
     *
     * @param {Date} date The date.
     * @param {Boolean} [clone=false] `true` to create a clone of this date, clear the time and return it.
     * @return {Date} this or the clone.
     */
    clearTime : function(date, clone) {
        if (clone) {
            return Ext.Date.clearTime(Ext.Date.clone(date));
        }

        // get current date before clearing time
        var d = date.getDate();

        // clear time
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        if (date.getDate() != d) { // account for DST (i.e. day of month changed when setting hour = 0)
            // note: DST adjustments are assumed to occur in multiples of 1 hour (this is almost always the case)
            // refer to https://www.timeanddate.com/time/aboutdst.html for the (rare) exceptions to this rule

            // increment hour until cloned date == current date
            for (var hr = 1, c = utilDate.add(date, Ext.Date.HOUR, hr); c.getDate() != d; hr++, c = utilDate.add(date, Ext.Date.HOUR, hr));

            date.setDate(d);
            date.setHours(c.getHours());
        }

        return date;
    },

    /**
     * Provides a convenient method for performing basic date arithmetic. This method
     * does not modify the Date instance being called - it creates and returns
     * a new Date instance containing the resulting date value.
     *
     *     @example
     *     // Basic usage:
     *     var dt = Ext.Date.add(new Date('10/29/2006'), Ext.Date.DAY, 5);
     *     alert(dt); // 'Fri Nov 03 2006 00:00:00'
     *
     * You can also subtract date values by passing a negative value:
     *
     *     @example
     *     // Negative values will be subtracted:
     *     var dt2 = Ext.Date.add(new Date('10/1/2006'), Ext.Date.DAY, -5);
     *     alert(dt2); // 'Tue Sep 26 2006 00:00:00'
     *
     * @param {Date} date The date to modify.
     * @param {String} interval A valid date interval enum value.
     * @param {Number} value The amount to add to the current date.
     * @return {Date} The new Date instance.
     */
    add : function(date, interval, value) {
        var d = Ext.Date.clone(date);
        if (!interval || value === 0) return d;

        switch(interval.toLowerCase()) {
            case Ext.Date.MILLI:
                d= new Date(d.valueOf() + value);
                break;
            case Ext.Date.SECOND:
                d= new Date(d.valueOf() + value * 1000);
                break;
            case Ext.Date.MINUTE:
                d= new Date(d.valueOf() + value * 60000);
                break;
            case Ext.Date.HOUR:
                d= new Date(d.valueOf() + value * 3600000);
                break;
            case Ext.Date.DAY:
                d= new Date(d.valueOf() + value * 86400000);
                break;
            case Ext.Date.MONTH:
                var day = date.getDate();
                if (day > 28) {
                    day = Math.min(day, Ext.Date.getLastDateOfMonth(Ext.Date.add(Ext.Date.getFirstDateOfMonth(date), 'mo', value)).getDate());
                }
                d.setDate(day);
                d.setMonth(date.getMonth() + value);
                break;
            case Ext.Date.YEAR:
                d.setFullYear(date.getFullYear() + value);
                break;
        }
        return d;
    },

    /**
     * Checks if a date falls on or between the given start and end dates.
     * @param {Date} date The date to check.
     * @param {Date} start Start date.
     * @param {Date} end End date.
     * @return {Boolean} `true` if this date falls on or between the given start and end dates.
     */
    between : function(date, start, end) {
        var t = date.getTime();
        return start.getTime() <= t && t <= end.getTime();
    },

    /**
     * Calculate how many units are there between two time.
     * @param {Date} min The first time.
     * @param {Date} max The second time.
     * @param {String} unit The unit. This unit is compatible with the date interval constants.
     * @return {Number} The maximum number n of units that min + n * unit <= max.
     */
    diff: function (min, max, unit) {
        var ExtDate = Ext.Date, est, diff = +max - min;
        switch (unit) {
            case ExtDate.MILLI:
                return diff;
            case ExtDate.SECOND:
                return Math.floor(diff / 1000);
            case ExtDate.MINUTE:
                return Math.floor(diff / 60000);
            case ExtDate.HOUR:
                return Math.floor(diff / 3600000);
            case ExtDate.DAY:
                return Math.floor(diff / 86400000);
            case 'w':
                return Math.floor(diff / 604800000);
            case ExtDate.MONTH:
                est = (max.getFullYear() * 12 + max.getMonth()) - (min.getFullYear() * 12 + min.getMonth());
                if (Ext.Date.add(min, unit, est) > max) {
                    return est - 1;
                } else {
                    return est;
                }
            case ExtDate.YEAR:
                est = max.getFullYear() - min.getFullYear();
                if (Ext.Date.add(min, unit, est) > max) {
                    return est - 1;
                } else {
                    return est;
                }
        }
    },

    /**
     * Align the date to `unit`.
     * @param {Date} date The date to be aligned.
     * @param {String} unit The unit. This unit is compatible with the date interval constants.
     * @return {Date} The aligned date.
     */
    align: function (date, unit, step) {
        var num = new Date(+date);
        switch (unit.toLowerCase()) {
            case Ext.Date.MILLI:
                return num;
                break;
            case Ext.Date.SECOND:
                num.setUTCSeconds(num.getUTCSeconds() - num.getUTCSeconds() % step);
                num.setUTCMilliseconds(0);
                return num;
                break;
            case Ext.Date.MINUTE:
                num.setUTCMinutes(num.getUTCMinutes() - num.getUTCMinutes() % step);
                num.setUTCSeconds(0);
                num.setUTCMilliseconds(0);
                return num;
                break;
            case Ext.Date.HOUR:
                num.setUTCHours(num.getUTCHours() - num.getUTCHours() % step);
                num.setUTCMinutes(0);
                num.setUTCSeconds(0);
                num.setUTCMilliseconds(0);
                return num;
                break;
            case Ext.Date.DAY:
                if (step == 7 || step == 14){
                    num.setUTCDate(num.getUTCDate() - num.getUTCDay() + 1);
                }
                num.setUTCHours(0);
                num.setUTCMinutes(0);
                num.setUTCSeconds(0);
                num.setUTCMilliseconds(0);
                return num;
                break;
            case Ext.Date.MONTH:
                num.setUTCMonth(num.getUTCMonth() - (num.getUTCMonth() - 1) % step,1);
                num.setUTCHours(0);
                num.setUTCMinutes(0);
                num.setUTCSeconds(0);
                num.setUTCMilliseconds(0);
                return num;
                break;
            case Ext.Date.YEAR:
                num.setUTCFullYear(num.getUTCFullYear() - num.getUTCFullYear() % step, 1, 1);
                num.setUTCHours(0);
                num.setUTCMinutes(0);
                num.setUTCSeconds(0);
                num.setUTCMilliseconds(0);
                return date;
                break;
        }
    }
};

var utilDate = Ext.DateExtras;

Ext.apply(Ext.Date, utilDate);

//<deprecated product=touch since="2.0">
Ext.apply(Ext.util.Date, utilDate);
//</deprecated>

})();


