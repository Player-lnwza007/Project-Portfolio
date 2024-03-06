
$(window).on('load', function() {
    if (feather) {
        feather.replace({
            width: 14,
            height: 14
        });
    }
});


$(document).ready(function() {
    const path = document.URL;

    $('.nav-item li').filter(function() {
        return $('a', this).attr('href') === path;
    }).parents("li").addClass('has-sub sidebar-group-active menu-collapsed-open');
    $('.nav-item li').filter(function() {
        return $('a', this).attr('href') === path;
    }).addClass('active ');
    $('.nav-item').filter(function() {
        return $('a', this).attr('href') === path;
    }).addClass('active ');
    
    $(".select2").select2({
        language: 'th'
    });
})

const languageTH = {
    // firstDayOfWeek: 1,
    time_24hr: true,
    weekdays: {
        shorthand: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
        longhand: [
            "อาทิตย์",
            "จันทร์",
            "อังคาร",
            "พุธ",
            "พฤหัสบดี",
            "ศุกร์",
            "เสาร์",
        ],
    },
    months: {
        shorthand: [
            "ม.ค.",
            "ก.พ.",
            "มี.ค.",
            "เม.ย.",
            "พ.ค.",
            "มิ.ย.",
            "ก.ค.",
            "ส.ค.",
            "ก.ย.",
            "ต.ค.",
            "พ.ย.",
            "ธ.ค.",
        ],
        longhand: [
            "มกราคม",
            "กุมภาพันธ์",
            "มีนาคม",
            "เมษายน",
            "พฤษภาคม",
            "มิถุนายน",
            "กรกฎาคม",
            "สิงหาคม",
            "กันยายน",
            "ตุลาคม",
            "พฤศจิกายน",
            "ธันวาคม",
        ],
    },
    firstDayOfWeek: 1,
    rangeSeparator: " ถึง ",
    scrollTitle: "เลื่อนเพื่อเพิ่มหรือลด",
    toggleTitle: "คลิกเพื่อเปลี่ยน",
    ordinal: function () {
        return "";
    },
};

function flatpickr_basic() {
    $(".flatpickr-basic").flatpickr({
        altInput: true,
        altFormat: "j F Y",
        dateFormat: "Y-m-d",
        maxDate: "today",
        locale: languageTH
    });
}

function flatpickr_forward() {
    $(".flatpickr-forward").flatpickr({
        altInput: true,
        altFormat: "j F Y",
        dateFormat: "Y-m-d",
        locale: languageTH
    });
}

function flatpickr_readonly() {
    $(".flatpickr-readonly").flatpickr({
        altInput: true,
        altFormat: "j F Y",
        dateFormat: "Y-m-d",
        locale: languageTH,
        noCalendar: true, // Hide the calendar
    });
}

function flatpickr_range() {
    $(".flatpickr-range").flatpickr({
        mode: "range",
        altInput: true,
        altFormat: "j F Y",
        dateFormat: "Y-m-d",
        locale: languageTH,
        maxDate: "today",
    });
}