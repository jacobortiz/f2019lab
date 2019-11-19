$.ajax({
    type: "post",
    url: "/exercises/routing/add", // Need /add as parameter
    dataType: "json",
    data: {
        "timestamp": (new Date()).getMilliseconds(),
        "username": "JimmyD1978",
        "messages": ['this is a test message', 'another one']
    },
    success: function(data, status) {
        console.log('good data back', data)
    },
    error: function(xhr, status, description) {
        console.log('no good', description);
    },
    complete: function(data, status) { 
        console.log('called no matter what');
    }
});