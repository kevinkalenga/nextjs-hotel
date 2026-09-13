class APIFilters {
    query: any;
    queryStr: any;

    constructor(query: any, queryStr: any) {
        this.query = query;
        this.queryStr = queryStr;
    }
    //Seach by key word
    search() : APIFilters {

      const location = this.queryStr?.location ? {
        address: {
            $regex: this.queryStr.location,
            $options: "i",
        }
      } : {}

      this.query = this.query.find({...location})
      
      return this;
    }
    
    //Filter
    filter(): APIFilters {
      const queryCopy = {...this.queryStr}
      console.log('queryCopy', queryCopy)
      // wen dont wanna andle location iin the search function again
      const removeFields = ["location", "page"]
      removeFields.forEach((el) => delete queryCopy[el])

      this.query = this.query.find(queryCopy)

      console.log('queryCopy2:', queryCopy)

      return this
    }

    //Pagination 
    pagination(resPerPage: number): APIFilters {
      // get the current page or one by default
      const currentPage = Number(this.queryStr?.page) || 1;
      // to skip four so as to go to the next page which is number 2
      const skip = resPerPage * (currentPage - 1);

      this.query = this.query.limit(resPerPage).skip(skip)
      return this
    }
}

export default APIFilters;