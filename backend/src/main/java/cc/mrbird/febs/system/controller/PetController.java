package cc.mrbird.febs.system.controller;

import cc.mrbird.febs.common.annotation.Log;
import cc.mrbird.febs.common.controller.BaseController;
import cc.mrbird.febs.common.domain.QueryRequest;
import cc.mrbird.febs.common.exception.FebsException;
import cc.mrbird.febs.system.domain.Dept;
import cc.mrbird.febs.system.domain.Pet;
import cc.mrbird.febs.system.service.DeptService;
import cc.mrbird.febs.system.service.PetService;
import com.baomidou.mybatisplus.core.toolkit.StringPool;
import com.wuwenze.poi.ExcelKit;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.datetime.DateFormatter;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Slf4j
@Validated
@RestController
@RequestMapping("pet")
public class PetController extends BaseController {

    private String message;

    @Autowired
    private PetService petService;


    @GetMapping
    public Map<String, Object> roleList(QueryRequest queryRequest, Pet pet) {
        Map<String,Object> data = getDataTable(petService.findPetDetail(pet, queryRequest));
        return data;
    }

    @Log("新增宠物")
    @PostMapping
    @RequiresPermissions("pet:add")
    public void addPet(@Valid Pet pet) throws FebsException {
        try {
            this.petService.createPet(pet);
        } catch (Exception e) {
            message = "新增部门失败";
            log.error(message, e);
            throw new FebsException(message);
        }
    }

    @Log("删除宠物")
    @DeleteMapping("/{petIds}")
    @RequiresPermissions("pet:delete")
    public void deletePet(@NotBlank(message = "{required}") @PathVariable String petIds) throws FebsException {
        try {
            String[] ids = petIds.split(StringPool.COMMA);
            this.petService.deletePet(ids);
        } catch (Exception e) {
            message = "删除部门失败";
            log.error(message, e);
            throw new FebsException(message);
        }
    }

    @Log("修改宠物")
    @PutMapping
    @RequiresPermissions("pet:update")
    public void updatePet(@Valid Pet pet) throws FebsException {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        pet.setPetModifyTime(df.format(new Date()));// new Date()为获取当前系统时间
        try {
            this.petService.updatePet(pet);
        } catch (Exception e) {
            message = "修改部门失败";
            log.error(message, e);
            throw new FebsException(message);
        }
    }

}
