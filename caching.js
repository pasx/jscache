var utils = utils || {};

utils.caching = (function() {

	return{

		CachedData: function(key, data){
			this.key = key;
			this.data = data;
		},

		BaseCache: function(){

			this.cache = [];
			this.max = 10;
			this.compareFunc = null;
			var i = 0;

			var _crunch = function(force){
				if(!force && i<=this.max/2) {i++; return;} //no attempt to crunch unless index reaches max/2
				i=0;
				var l = this.cache.length;
				if(l<=this.max) {return;}
				var sliceFrom = l - this.max;
				this.cache = this.cache.slice(sliceFrom);
			};

			this.get = function(key){
				var that = this;
				var compare = this.compareFunc
					?  
						function(otherKey){
							return that.compareFunc(key,otherKey);
						}
				 	: 
						function(otherKey){
							return key==otherKey;
				}
				return Enumerable.From(this.cache).FirstOrDefault(null,function (data) { return compare(data.key); });
			};

			this.contains = function(key){		
				return null != this.get(key);
			};

			this.count = function(){		
				return this.cache.length;
			};

			this.add = function(key, data){
				if(this.contains(key)){
					return false;
				}
				this.cache.push(new utils.caching.CachedData(key, data));
				return true;
			};

			this.clear= function(){
				this.cache = [];
			};

			this.crunch= function(){
				_crunch(true);
			};

		},

		SimpleCache: function(customCompareFunc){

			utils.caching.BaseCache.apply(this, arguments);
			this.compareFunc = customCompareFunc;
		},

		SpatialCache: function(customCompareFunc){

			utils.caching.SimpleCache.apply(this, arguments);
			this.compareFunc = customCompareFunc || function(bounds, otherBounds){return bounds.equals(otherBounds);};
		}

	};
})();