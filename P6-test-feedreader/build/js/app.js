function init(){loadFeed(0)}function loadFeed(e,n){var t=allFeeds[e].url,a=allFeeds[e].name;$.ajax({type:"POST",url:"https://rsstojson.udacity.com/parseFeed",data:JSON.stringify({url:t}),contentType:"application/json",success:function(e,t){var d=$(".feed"),l=$(".header-title"),o=e.feed.entries,i=(o.length,Handlebars.compile($(".tpl-entry").html()));l.html(a),d.empty(),o.forEach(function(e){d.append(i(e))}),n&&n()},error:function(e,t,a){n&&n()},dataType:"json"})}var allFeeds=[{name:"Udacity Blog",url:"http://blog.udacity.com/feed"},{name:"CSS Tricks",url:"http://css-tricks.com/feed"},{name:"HTML5 Rocks",url:"http://feeds.feedburner.com/html5rocks"},{name:"Linear Digressions",url:"http://feeds.feedburner.com/udacity-linear-digressions"}];google.load("feeds","1"),google.setOnLoadCallback(init),$(function(){var e=($(".feed"),$(".feed-list")),n=Handlebars.compile($(".tpl-feed-list-item").html()),t=0,a=$(".menu-icon-link");allFeeds.forEach(function(a){a.id=t,e.append(n(a)),t++}),e.on("click","a",function(){var e=$(this);return $("body").addClass("menu-hidden"),loadFeed(e.data("id")),!1}),a.on("click",function(){$("body").toggleClass("menu-hidden")})}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJpbml0IiwibG9hZEZlZWQiLCJpZCIsImNiIiwiZmVlZFVybCIsImFsbEZlZWRzIiwidXJsIiwiZmVlZE5hbWUiLCJuYW1lIiwiJCIsImFqYXgiLCJ0eXBlIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb250ZW50VHlwZSIsInN1Y2Nlc3MiLCJyZXN1bHQiLCJzdGF0dXMiLCJjb250YWluZXIiLCJ0aXRsZSIsImVudHJpZXMiLCJmZWVkIiwiZW50cnlUZW1wbGF0ZSIsImxlbmd0aCIsIkhhbmRsZWJhcnMiLCJjb21waWxlIiwiaHRtbCIsImVtcHR5IiwiZm9yRWFjaCIsImVudHJ5IiwiYXBwZW5kIiwiZXJyb3IiLCJlcnIiLCJkYXRhVHlwZSIsImdvb2dsZSIsImxvYWQiLCJzZXRPbkxvYWRDYWxsYmFjayIsImZlZWRMaXN0IiwiZmVlZEl0ZW1UZW1wbGF0ZSIsImZlZWRJZCIsIm1lbnVJY29uIiwib24iLCJpdGVtIiwidGhpcyIsImFkZENsYXNzIiwidG9nZ2xlQ2xhc3MiXSwibWFwcGluZ3MiOiJBQTZCQSxRQUFTQSxRQUVMQyxTQUFTLEdBV1osUUFBU0EsVUFBU0MsRUFBSUMsR0FDbEIsR0FBSUMsR0FBVUMsU0FBU0gsR0FBSUksSUFDdkJDLEVBQVdGLFNBQVNILEdBQUlNLElBRTVCQyxHQUFFQyxNQUNBQyxLQUFNLE9BQ05MLElBQUssMENBQ0xNLEtBQU1DLEtBQUtDLFdBQVdSLElBQUtGLElBQzNCVyxZQUFZLG1CQUNaQyxRQUFTLFNBQVVDLEVBQVFDLEdBRWpCLEdBQUlDLEdBQVlWLEVBQUUsU0FDZFcsRUFBUVgsRUFBRSxpQkFDVlksRUFBVUosRUFBT0ssS0FBS0QsUUFFdEJFLEdBRGFGLEVBQVFHLE9BQ0xDLFdBQVdDLFFBQVFqQixFQUFFLGNBQWNrQixRQUV2RFAsR0FBTU8sS0FBS3BCLEdBQ1hZLEVBQVVTLFFBT1ZQLEVBQVFRLFFBQVEsU0FBU0MsR0FDckJYLEVBQVVZLE9BQU9SLEVBQWNPLE1BRy9CM0IsR0FDQUEsS0FHZDZCLE1BQU8sU0FBVWYsRUFBUUMsRUFBUWUsR0FFbkI5QixHQUNBQSxLQUdkK0IsU0FBVSxTQXhFakIsR0FBSTdCLFlBRUlHLEtBQU0sZUFDTkYsSUFBSyxpQ0FFTEUsS0FBTSxhQUNORixJQUFLLCtCQUVMRSxLQUFNLGNBQ05GLElBQUssMkNBRUxFLEtBQU0scUJBQ05GLElBQUssMERBbUViNkIsUUFBT0MsS0FBSyxRQUFTLEtBQ3JCRCxPQUFPRSxrQkFBa0JyQyxNQU16QlMsRUFBRSxXQUNFLEdBQ0k2QixJQURZN0IsRUFBRSxTQUNIQSxFQUFFLGVBQ2I4QixFQUFtQmQsV0FBV0MsUUFBUWpCLEVBQUUsdUJBQXVCa0IsUUFDL0RhLEVBQVMsRUFDVEMsRUFBV2hDLEVBQUUsa0JBUWpCSixVQUFTd0IsUUFBUSxTQUFTUCxHQUN0QkEsRUFBS3BCLEdBQUtzQyxFQUNWRixFQUFTUCxPQUFPUSxFQUFpQmpCLElBRWpDa0IsTUFPSkYsRUFBU0ksR0FBRyxRQUFTLElBQUssV0FDdEIsR0FBSUMsR0FBT2xDLEVBQUVtQyxLQUliLE9BRkFuQyxHQUFFLFFBQVFvQyxTQUFTLGVBQ25CNUMsU0FBUzBDLEVBQUsvQixLQUFLLFFBQ1osSUFNWDZCLEVBQVNDLEdBQUcsUUFBUyxXQUNqQmpDLEVBQUUsUUFBUXFDLFlBQVkiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogYXBwLmpzXG4gKlxuICogVGhpcyBpcyBvdXIgUlNTIGZlZWQgcmVhZGVyIGFwcGxpY2F0aW9uLiBJdCB1c2VzIHRoZSBHb29nbGVcbiAqIEZlZWQgUmVhZGVyIEFQSSB0byBncmFiIFJTUyBmZWVkcyBhcyBKU09OIG9iamVjdCB3ZSBjYW4gbWFrZVxuICogdXNlIG9mLiBJdCBhbHNvIHVzZXMgdGhlIEhhbmRsZWJhcnMgdGVtcGxhdGluZyBsaWJyYXJ5IGFuZFxuICogalF1ZXJ5LlxuICovXG5cbi8vIFRoZSBuYW1lcyBhbmQgVVJMcyB0byBhbGwgb2YgdGhlIGZlZWRzIHdlJ2QgbGlrZSBhdmFpbGFibGUuXG52YXIgYWxsRmVlZHMgPSBbXG4gICAge1xuICAgICAgICBuYW1lOiAnVWRhY2l0eSBCbG9nJyxcbiAgICAgICAgdXJsOiAnaHR0cDovL2Jsb2cudWRhY2l0eS5jb20vZmVlZCdcbiAgICB9LCB7XG4gICAgICAgIG5hbWU6ICdDU1MgVHJpY2tzJyxcbiAgICAgICAgdXJsOiAnaHR0cDovL2Nzcy10cmlja3MuY29tL2ZlZWQnXG4gICAgfSwge1xuICAgICAgICBuYW1lOiAnSFRNTDUgUm9ja3MnLFxuICAgICAgICB1cmw6ICdodHRwOi8vZmVlZHMuZmVlZGJ1cm5lci5jb20vaHRtbDVyb2NrcydcbiAgICB9LCB7XG4gICAgICAgIG5hbWU6ICdMaW5lYXIgRGlncmVzc2lvbnMnLFxuICAgICAgICB1cmw6ICdodHRwOi8vZmVlZHMuZmVlZGJ1cm5lci5jb20vdWRhY2l0eS1saW5lYXItZGlncmVzc2lvbnMnXG4gICAgfVxuXTtcblxuLyogVGhpcyBmdW5jdGlvbiBzdGFydHMgdXAgb3VyIGFwcGxpY2F0aW9uLiBUaGUgR29vZ2xlIEZlZWRcbiAqIFJlYWRlciBBUEkgaXMgbG9hZGVkIGFzeW5jaG9ub3VzbHkgYW5kIHdpbGwgdGhlbiBjYWxsIHRoaXNcbiAqIGZ1bmN0aW9uIHdoZW4gdGhlIEFQSSBpcyBsb2FkZWQuXG4gKi9cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgLy8gTG9hZCB0aGUgZmlyc3QgZmVlZCB3ZSd2ZSBkZWZpbmVkIChpbmRleCBvZiAwKS5cbiAgICBsb2FkRmVlZCgwKTtcbn1cblxuLyogVGhpcyBmdW5jdGlvbiBwZXJmb3JtcyBldmVyeXRoaW5nIG5lY2Vzc2FyeSB0byBsb2FkIGFcbiAqIGZlZWQgdXNpbmcgdGhlIEdvb2dsZSBGZWVkIFJlYWRlciBBUEkuIEl0IHdpbGwgdGhlblxuICogcGVyZm9ybSBhbGwgb2YgdGhlIERPTSBvcGVyYXRpb25zIHJlcXVpcmVkIHRvIGRpc3BsYXlcbiAqIGZlZWQgZW50cmllcyBvbiB0aGUgcGFnZS4gRmVlZHMgYXJlIHJlZmVyZW5jZWQgYnkgdGhlaXJcbiAqIGluZGV4IHBvc2l0aW9uIHdpdGhpbiB0aGUgYWxsRmVlZHMgYXJyYXkuXG4gKiBUaGlzIGZ1bmN0aW9uIGFsbCBzdXBwb3J0cyBhIGNhbGxiYWNrIGFzIHRoZSBzZWNvbmQgcGFyYW1ldGVyXG4gKiB3aGljaCB3aWxsIGJlIGNhbGxlZCBhZnRlciBldmVyeXRoaW5nIGhhcyBydW4gc3VjY2Vzc2Z1bGx5LlxuICovXG4gZnVuY3Rpb24gbG9hZEZlZWQoaWQsIGNiKSB7XG4gICAgIHZhciBmZWVkVXJsID0gYWxsRmVlZHNbaWRdLnVybCxcbiAgICAgICAgIGZlZWROYW1lID0gYWxsRmVlZHNbaWRdLm5hbWU7XG5cbiAgICAgJC5hamF4KHtcbiAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICB1cmw6ICdodHRwczovL3Jzc3RvanNvbi51ZGFjaXR5LmNvbS9wYXJzZUZlZWQnLFxuICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHt1cmw6IGZlZWRVcmx9KSxcbiAgICAgICBjb250ZW50VHlwZTpcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0LCBzdGF0dXMpe1xuXG4gICAgICAgICAgICAgICAgIHZhciBjb250YWluZXIgPSAkKCcuZmVlZCcpLFxuICAgICAgICAgICAgICAgICAgICAgdGl0bGUgPSAkKCcuaGVhZGVyLXRpdGxlJyksXG4gICAgICAgICAgICAgICAgICAgICBlbnRyaWVzID0gcmVzdWx0LmZlZWQuZW50cmllcyxcbiAgICAgICAgICAgICAgICAgICAgIGVudHJpZXNMZW4gPSBlbnRyaWVzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgIGVudHJ5VGVtcGxhdGUgPSBIYW5kbGViYXJzLmNvbXBpbGUoJCgnLnRwbC1lbnRyeScpLmh0bWwoKSk7XG5cbiAgICAgICAgICAgICAgICAgdGl0bGUuaHRtbChmZWVkTmFtZSk7ICAgLy8gU2V0IHRoZSBoZWFkZXIgdGV4dFxuICAgICAgICAgICAgICAgICBjb250YWluZXIuZW1wdHkoKTsgICAgICAvLyBFbXB0eSBvdXQgYWxsIHByZXZpb3VzIGVudHJpZXNcblxuICAgICAgICAgICAgICAgICAvKiBMb29wIHRocm91Z2ggdGhlIGVudHJpZXMgd2UganVzdCBsb2FkZWQgdmlhIHRoZSBHb29nbGVcbiAgICAgICAgICAgICAgICAgICogRmVlZCBSZWFkZXIgQVBJLiBXZSdsbCB0aGVuIHBhcnNlIHRoYXQgZW50cnkgYWdhaW5zdCB0aGVcbiAgICAgICAgICAgICAgICAgICogZW50cnlUZW1wbGF0ZSAoY3JlYXRlZCBhYm92ZSB1c2luZyBIYW5kbGViYXJzKSBhbmQgYXBwZW5kXG4gICAgICAgICAgICAgICAgICAqIHRoZSByZXN1bHRpbmcgSFRNTCB0byB0aGUgbGlzdCBvZiBlbnRyaWVzIG9uIHRoZSBwYWdlLlxuICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kKGVudHJ5VGVtcGxhdGUoZW50cnkpKTtcbiAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICB9LFxuICAgICAgIGVycm9yOiBmdW5jdGlvbiAocmVzdWx0LCBzdGF0dXMsIGVycil7XG4gICAgICAgICAgICAgICAgIC8vcnVuIG9ubHkgdGhlIGNhbGxiYWNrIHdpdGhvdXQgYXR0ZW1wdGluZyB0byBwYXJzZSByZXN1bHQgZHVlIHRvIGVycm9yXG4gICAgICAgICAgICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgfSxcbiAgICAgICBkYXRhVHlwZTogXCJqc29uXCJcbiAgICAgfSk7XG4gfVxuXG4vKiBHb29nbGUgQVBJOiBMb2FkcyB0aGUgRmVlZCBSZWFkZXIgQVBJIGFuZCBkZWZpbmVzIHdoYXQgZnVuY3Rpb25cbiAqIHRvIGNhbGwgd2hlbiB0aGUgRmVlZCBSZWFkZXIgQVBJIGlzIGRvbmUgbG9hZGluZy5cbiAqL1xuZ29vZ2xlLmxvYWQoJ2ZlZWRzJywgJzEnKTtcbmdvb2dsZS5zZXRPbkxvYWRDYWxsYmFjayhpbml0KTtcblxuLyogQWxsIG9mIHRoaXMgZnVuY3Rpb25hbGl0eSBpcyBoZWF2aWx5IHJlbGlhbnQgdXBvbiB0aGUgRE9NLCBzbyB3ZVxuICogcGxhY2Ugb3VyIGNvZGUgaW4gdGhlICQoKSBmdW5jdGlvbiB0byBlbnN1cmUgaXQgZG9lc24ndCBleGVjdXRlXG4gKiB1bnRpbCB0aGUgRE9NIGlzIHJlYWR5LlxuICovXG4kKGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb250YWluZXIgPSAkKCcuZmVlZCcpLFxuICAgICAgICBmZWVkTGlzdCA9ICQoJy5mZWVkLWxpc3QnKSxcbiAgICAgICAgZmVlZEl0ZW1UZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZSgkKCcudHBsLWZlZWQtbGlzdC1pdGVtJykuaHRtbCgpKSxcbiAgICAgICAgZmVlZElkID0gMCxcbiAgICAgICAgbWVudUljb24gPSAkKCcubWVudS1pY29uLWxpbmsnKTtcblxuICAgIC8qIExvb3AgdGhyb3VnaCBhbGwgb2Ygb3VyIGZlZWRzLCBhc3NpZ25pbmcgYW4gaWQgcHJvcGVydHkgdG9cbiAgICAgKiBlYWNoIG9mIHRoZSBmZWVkcyBiYXNlZCB1cG9uIGl0cyBpbmRleCB3aXRoaW4gdGhlIGFycmF5LlxuICAgICAqIFRoZW4gcGFyc2UgdGhhdCBmZWVkIGFnYWluc3QgdGhlIGZlZWRJdGVtVGVtcGxhdGUgKGNyZWF0ZWRcbiAgICAgKiBhYm92ZSB1c2luZyBIYW5kbGViYXJzKSBhbmQgYXBwZW5kIGl0IHRvIHRoZSBsaXN0IG9mIGFsbFxuICAgICAqIGF2YWlsYWJsZSBmZWVkcyB3aXRoaW4gdGhlIG1lbnUuXG4gICAgICovXG4gICAgYWxsRmVlZHMuZm9yRWFjaChmdW5jdGlvbihmZWVkKSB7XG4gICAgICAgIGZlZWQuaWQgPSBmZWVkSWQ7XG4gICAgICAgIGZlZWRMaXN0LmFwcGVuZChmZWVkSXRlbVRlbXBsYXRlKGZlZWQpKTtcblxuICAgICAgICBmZWVkSWQrKztcbiAgICB9KTtcblxuICAgIC8qIFdoZW4gYSBsaW5rIGluIG91ciBmZWVkTGlzdCBpcyBjbGlja2VkIG9uLCB3ZSB3YW50IHRvIGhpZGVcbiAgICAgKiB0aGUgbWVudSwgbG9hZCB0aGUgZmVlZCwgYW5kIHByZXZlbnQgdGhlIGRlZmF1bHQgYWN0aW9uXG4gICAgICogKGZvbGxvd2luZyB0aGUgbGluaykgZnJvbSBvY2N1cnJpbmcuXG4gICAgICovXG4gICAgZmVlZExpc3Qub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSAkKHRoaXMpO1xuXG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnbWVudS1oaWRkZW4nKTtcbiAgICAgICAgbG9hZEZlZWQoaXRlbS5kYXRhKCdpZCcpKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgLyogV2hlbiB0aGUgbWVudSBpY29uIGlzIGNsaWNrZWQgb24sIHdlIG5lZWQgdG8gdG9nZ2xlIGEgY2xhc3NcbiAgICAgKiBvbiB0aGUgYm9keSB0byBwZXJmb3JtIHRoZSBoaWRpbmcvc2hvd2luZyBvZiBvdXIgbWVudS5cbiAgICAgKi9cbiAgICBtZW51SWNvbi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdtZW51LWhpZGRlbicpO1xuICAgIH0pO1xufSgpKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
